import MessageToRepository from "../repository/messageToRepository.js";
import MessageToService from "../services/messageToService.js";
import { logger, loggerError } from "../utils/logger.js";

export const messageToStorage = new MessageToRepository();
export const messageToService = new MessageToService(messageToStorage);

export const createMessage = async (req, res) => {
    const newMessage = req.body;
    return messageToService.createMsgs(newMessage)
        .then(message => {
            logger.info('Mensaje creado')
            return res.status(201).json({ msg: message })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        });
}
export const getMessages = async (req, res) => {
    return messageToService.getMsgs()
        .then(message => {
            if (!message.length) {
                return res.status(404).json({ mensaje: "No hay mensajes" })
            }
            res.status(200).json(message);
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        })
}

export const getOwnMessages = async (req, res) => {
    const alias = req.params.alias;
    return messageToService.getOwnMsgs(alias)
        .then(message => {
            message.length ? res.status(200).json(message) :
                res.status(404).json({ mensaje: "No se encuentran mensajes de este usuario" });
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        })
}