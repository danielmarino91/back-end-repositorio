class MessageToDTO {
    constructor(message) {
        this.author = message.author;
        this.text = message.text;
        this.time = message.time;
        this.to = message.to;
    }
}

export default MessageToDTO;