import MessageToDTO from "../dtos/messageToDTO.js";
import DAOFactory from "../factory/DAOfactory.js";

const myDAO = new DAOFactory();

class MessageRepository {
    constructor() {
        this.dao = myDAO.getMsgToDAO();
    }

    async getMessages() {
        const messages = await this.dao.getElems();
        return messages.map(message => new MessageToDTO(message));
    }

    async getOwnMsgs(alias) {
        const messages = await this.dao.getOwnMsgs(alias);
        return messages.map(message => new MessageToDTO(message));
    }

    async createMessage(message) {
        return await this.dao.postElem(message);
    }
}

export default MessageRepository;