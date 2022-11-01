import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { validateNewOrder, jwt } from "../middlewares/middlewares.js";

const { Router } = express;
const orderRouter = Router()

export default orderRouter;

orderRouter.get('', jwt, getOrders)
orderRouter.post('', validateNewOrder(), createOrder);