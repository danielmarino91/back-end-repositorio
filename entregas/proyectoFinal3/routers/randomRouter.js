import express from "express";
const { Router } = express;
const randomRouter = Router()
import { calc, random } from '../randomNumbers.js'

export default randomRouter;

randomRouter.get('/', (req, res) => {
    const numeros = req.query.cant || 100000000;

    return res.json(calc(random(numeros)))

})