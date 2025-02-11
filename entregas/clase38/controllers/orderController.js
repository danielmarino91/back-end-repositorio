import { loggerError } from "../utils/logger.js";
import OrderDAOMongoDB from "../daos/orderDAOMongoDB.js"
import OrderService from "../services/orderService.js";
export const orderStorage = new OrderDAOMongoDB();
const orderService = new OrderService(orderStorage);

export const getOrders = async (req, res) => {
    return orderService.getElems()
        .then(ordenes => {
            return res.json({ ordenes })
        })
        .catch(err => { res.send(err); loggerError.error(err); })
}

export const createOrder = async (req, res) => {
    const orderData = req.body;
    orderData.order.products = JSON.parse(orderData.order.products);

    return orderService.createOrder(orderData)
        .then(() => res.redirect('/api/'))
        .catch(err => { res.send(err); loggerError.error(err); })
}