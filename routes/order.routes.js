const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router
    .route('/')
    .post(orderController.createOrder)
    .get(orderController.getAllOrders)
    .delete(orderController.deleteAllOrders);

router
    .route('/:id')
    .get(orderController.getOrderById)
    .delete(orderController.deleteOrderById);

router
    .route('/:id/status')
    .patch(orderController.updateOrderStatusOnly);

module.exports = router;