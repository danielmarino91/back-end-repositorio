import express from 'express';
import passport from 'passport';
import { register, login } from './jwtAuth.js';

const { Router } = express;
const authRouter = Router()

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({ message: 'Status 200 OK', userId: req.user.id })
})

export default authRouter;