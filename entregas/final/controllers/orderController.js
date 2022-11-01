import OrderService from "../services/orderService.js";
import DAOFactory from "../factory/DAOfactory.js";
import { loggerError } from "../utils/logger.js";

const myDAO = new DAOFactory();

export const orderStorage = myDAO.getOrderDAO();

export const orderService = new OrderService(orderStorage);

export const getOrders = async (req, res) => {
    return orderService.getOrders()
        .then(orders => {
            return res.status(200).json({ orders })
        })
        .catch(error => {
            res.status(500).json(error.toString());
            loggerError.error(error.toString());
        })
}

export const createOrder = async (req, res) => {
    const orderData = req.body;
    orderData.order.products = JSON.parse(orderData.order.products);

    return orderService.createOrder(orderData)
        .then(() => {
            return res.redirect('/api/')
        })
        .catch(error => {
            res.status(500).json(error.toString());
            loggerError.error(error.toString());
        })
}