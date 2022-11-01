class MessageToService {
    constructor(repository) {
        this.repository = repository;
    }

    async getMsgs() {
        return this.repository.getMessages();
    }

    async getOwnMsgs(alias) {
        return this.repository.getOwnMsgs(alias);
    }

    async createMsgs(message) {
        return this.repository.createMessage(message);
    }
}

export default MessageToService;