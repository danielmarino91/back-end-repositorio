import MessageDTO from "../dtos/messageDTO.js";
import DAOFactory from "../factory/DAOfactory.js";

const myDAO = new DAOFactory();

class MessageRepository {
    constructor() {
        this.dao = myDAO.getMsgDAO();
    }

    async getMessages() {
        const messages = await this.dao.getElems();
        return messages.map(message => new MessageDTO(message));
    }

    async getOwnMsgs(alias) {
        const messages = await this.dao.getOwnMsgs(alias);
        return messages.map(message => new MessageDTO(message));
    }

    async createMessage(message) {
        return await this.dao.postElem(message);
    }
}

export default MessageRepository;