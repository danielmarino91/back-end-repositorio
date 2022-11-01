class contenedorMongo {
    constructor(db, model) {
        this.db = db;
        this.model = model;
    }

    async getElems() {
        return this.db
            .then(_ => this.model.find({}))
            .then(data => {
                return data
            })
    }

    async getElem(id) {
        return this.db
            .then(_ => this.model.find({ _id: id }))
            .then(data => {
                return data
            })
    }

    async postElem(e) {
        const newElement = new this.model(e);
        return this.db
            .then(_ => newElement.save())
            .then(_ => {
                return newElement;
            });
    }

    async putElem(id, model) {
        return this.db
            .then(_ => this.model.updateOne({ _id: id }, { $set: model }))
            .then(_ => {
                return model
            })
    }

    async deleteElem(id) {
        return this.db
            .then(_ => this.model.findOne({ _id: id }))
            .then(elem => {
                return elem.remove()
            })
    }
}

export default contenedorMongo;