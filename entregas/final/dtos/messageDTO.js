class MessageDTO {
    constructor(msg) {
        this.author = msg.author;
        this.text = msg.text;
        this.time = msg.time;
    }
}

export default MessageDTO;