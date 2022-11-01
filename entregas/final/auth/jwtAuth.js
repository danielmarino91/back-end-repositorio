import twilio from 'twilio'
import passport from "passport"
import { createTransport } from 'nodemailer'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { User, cartModel } from '../dbmodels/dbsConfig.js'
import { createHash, isValidPassword } from '../utils/crypt.js'
import { loggerError } from "../utils/logger.js"
import jwt from "jsonwebtoken"
import "dotenv/config.js"

const accountSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN
const SECRET_KEY = process.env.SECRET_KEY
const ADMIN_MAIL = process.env.ADMIN_MAIL

const client = twilio(accountSid, authToken)

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_KEY

const generateToken = user => {
    const token = jwt.sign({ data: user }, SECRET_KEY, { expiresIn: '24h' })
    return token
}

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILACC
    }
})

export const register = async (req, res) => {

    let { username, password, phone, email } = req.body
    const userExists = await User.findOne({ username: username })
    const emailExists = await User.findOne({ email })
    const phoneExists = await User.findOne({ phone })

    const admin = req.body.admin || undefined

    if (admin) {
        req.body.admin = undefined
    }

    if (userExists) {
        return res.json({ error: 'El nombre de usuario se encuentra en uso' })
    }
    if (emailExists) {
        return res.json({ error: 'El email ingresado se encuentra en uso' })
    }
    if (phoneExists) {
        return res.json({ error: 'El telefono ingresado se encuentra en uso' })
    }

    client.lookups.v1.phoneNumbers(phone)
        .fetch({ type: ['carrier'] })
        .then(_ => {
            phoneError = false
        })
        .catch(err => loggerError.error(err))
        .finally(_ => {
            if (phoneError) {
                return res.status(400).json({ error: 'Formato de telefono inválido' })
            }
        })

    const hashedPassword = createHash(password)
    req.body.password = hashedPassword
    const user = { email: email, password: hashedPassword }

    const newUser = new User(req.body)
    const newCart = new cartModel()
    newUser.cart = newCart
    newUser.save()

    const mailOptions = {
        from: 'Daniel Mariño',
        to: ADMIN_MAIL,
        subject: 'Se registro un nuevo usuario',
        html: `
        <h1>${newUser.username} se registro</h1>
        <ul>
            <li>Usuario: ${newUser.username}</li>
            <li>Nombre: ${newUser.name}</li>
            <li>Email: ${newUser.email}</li>
            <li>Teléfono: ${newUser.phone}</li>
        </ul>
        `
    }

    try {
        transporter.sendMail(mailOptions)
    } catch (err) {
        loggerError.error(err)
    }

    const access_token = `Bearer ${generateToken(user)}`
    return res.json({ user, access_token })
}

export const login = async (req, res) => {

    const { email, password } = req.body

    const authUser = await User.findOne({ email: email })

    if (!authUser) {
        return res.status(404).json({ error: 'El usuario no existe' })
    }

    const passwordIsValid = isValidPassword(authUser.password, password)

    if (!passwordIsValid) {
        return res.status(400).json({ error: 'Contraseña incorrecta' })
    } else {
        const access_token = `Bearer ${generateToken(authUser)}`
        res.json({ authUser, access_token })
    }
}

export const jwtLogic = () => {
    return passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}