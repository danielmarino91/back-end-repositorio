import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, Order } from "../dbmodels/dbsConfig.js";

class OrderDAOMongoDB extends contenedorMongoDB {
    constructor() {
        super(db, Order)
    }

    async createOrder(orderData) {
        const newOrder = new this.model(orderData);
        return this.db
            .then(_ => newOrder.save())
    }
}

export default OrderDAOMongoDB;