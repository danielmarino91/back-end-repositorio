import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, Order } from "../dbmodels/dbsConfig.js";

class OrderDAOMongoDB extends contenedorMongoDB {
    constructor() {
        super(db, Order)
    }

    async getOwnOrders(id) {
        return this.db
            .then(_ => this.model.find({ owner: id }))
            .then(orders => {
                return orders
            })
    }

    async createOrder(data) {
        const newOrder = new this.model(data);
        return this.db
            .then(_ => newOrder.save())
    }
}

export default OrderDAOMongoDB;