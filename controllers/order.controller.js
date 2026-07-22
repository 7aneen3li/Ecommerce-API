const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

//POST
exports.createOrder = asyncHandler(async (req, res, next) => {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
        return next(new AppError('Shipping address details are required', 400));
    }

    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0) {
        return next(new AppError('Your cart is empty. Add items before checking out.', 400));
    }

    let calculatedTotalPrice = 0;
    const processedItems = [];
    const productsToUpdate = [];

    for (const item of cart.items) {
        const dbProduct = await Product.findById(item.product);

        if (!dbProduct) {
            return next(new AppError(`Produuct with ID ${item.product} does not exist.`, 404));
        }

        if (dbProduct.stock < item.quantity) {
            return next(new AppError(`Insufficient stock for product: ${dbProduct.name}. Available stock: ${dbProduct.stock}`, 400));
        }

        calculatedTotalPrice += dbProduct.price * item.quantity;

        processedItems.push({
            product: dbProduct._id,
            name: dbProduct.name,
            price: dbProduct.price,
            quantity: item.quantity
        });

        productsToUpdate.push({
            productDoc: dbProduct,
            newStock: dbProduct.stock - item.quantity
        });
    }

    for (const update of productsToUpdate) {
        update.productDoc.stock = update.newStock;
        await update.productDoc.save();
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = await Order.create({
        orderNumber,
        items: processedItems,
        totalPrice: calculatedTotalPrice,
        shippingAddress,
        status: 'pending'
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
        status: 'success',
        message: 'Order placed successfully',
        data: newOrder
    });
});

//GET
exports.getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find().sort('-createdAt');

    res.status(200).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        data: orders
    });
});

//GET..:id
exports.getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError('No order found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Order retrieved successfully',
        data: order
    });
});

//PATCH
exports.updateOrderStatusOnly = asyncHandler(async (req, res, next) => {
    const { status } = req.body;

    if (!status) {
        return next(new AppError('Status property must be specified', 400));
    }

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return next(new AppError(`${status} is not a valid order status`, 400));
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
    );

    if (!updatedOrder) {
        return next(new AppError('No order found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Order status updated successfully',
        data: updatedOrder
    });
});

//Remove an Order
exports.deleteOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new AppError('No order found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Order cleared successfully',
        data: null
    });
});

//clear all orders
exports.deleteAllOrders = asyncHandler(async (req, res, next) => {
    await Order.deleteMany({});

    res.status(200).json({
        status: 'success',
        message: 'All orders have been cleared successfully',
        data: null
    });
});