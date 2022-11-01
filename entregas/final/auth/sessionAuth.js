import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import process from 'process';
import { createTransport } from 'nodemailer';
import { createHash, isValidPassword } from '../utils/crypt.js';
import { loggerError } from "../utils/logger.js";
import { User, cartModel } from '../dbmodels/dbsConfig.js';
import "dotenv/config.js";

const ADMIN_MAIL = process.env.ADMIN_MAIL;

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILACC
    }
});

export const signup = () => {
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
    }, async (req, email, password, done) => {
        let errMsg = '';
        return User.findOne({ $or: [{ username: req.body.username }, { email: email }, { phone: req.body.phone }] })
            .then(user => {

                if (user) {
                    errMsg = 'El nombre de usuario, email y/o el número teléfonico se encuentran en uso'
                    return null;
                }

                if (password !== req.body.rpassword) {
                    errMsg = 'No coinciden las contraseñas';
                    return null;
                }

                if (req.session.phoneError) {
                    errMsg = req.session.phoneError;
                    return null;
                }

                const newUser = new User()
                const newCart = new cartModel();

                newUser.username = req.body.username
                newUser.password = createHash(password)
                newUser.email = email
                newUser.name = req.body.name
                newUser.address = req.body.address
                newUser.phone = req.body.phone
                newUser.photo = `${req.session.img}`
                newUser.cart = newCart;

                req.session.user = newUser;

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

                return newUser.save();
            })
            .then(user => {
                if (!user && errMsg !== '') {
                    return done(null, false, { message: errMsg })
                }
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
    }))
}

export const login = () => {
    passport.use('login', new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
            return User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Usuario inexistente' })
                    }

                    if (!isValidPassword(user.password, password)) {
                        return done(null, false, { message: 'Contraseña incorrecta' })
                    }

                    return done(null, user)
                })
                .catch(err => done(err))
        }))
}

export const serialize = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
}

export const deSerialize = () => {
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}