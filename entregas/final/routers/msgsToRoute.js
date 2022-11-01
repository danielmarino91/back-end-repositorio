import express from "express";
import { getMessages, getOwnMessages, createMessage } from "../controllers/messagesToController.js";

const { Router } = express;
const messagesToRouter = Router()

export default messagesToRouter;

messagesToRouter.get('/', getMessages);
messagesToRouter.get('/:alias', getOwnMessages);
messagesToRouter.post('/', createMessage);