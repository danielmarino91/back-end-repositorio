import MessageService from "../services/messageService.js";
import MessageRepository from "../repository/messageRepository.js";
import { logger, loggerError } from "../utils/logger.js";

export const messagesStorage = new MessageRepository();
export const messageService = new MessageService(messagesStorage);

export const getMessages = async (req, res) => {
    return messageService.getMsgs()
        .then(msgs => {
            res.status(200).json(msgs);
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        })
}

export const getOwnMessages = async (req, res) => {
    const name = req.params.alias;
    return messageService.getOwnMsgs(name)
        .then(msgs => {
            msgs.length ? res.status(200).json(msgs) :
                res.status(404).json({ mensaje: "No se encuentran mensajes para este usuario" });
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        })
}

export const createMessage = async (req, res) => {
    const newMsg = req.body;
    return messageService.createMsgs(newMsg)
        .then(msg => {
            logger.info('Mensaje creado con exito')
            return res.status(201).json({ msg })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        });
}