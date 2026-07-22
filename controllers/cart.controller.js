const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getOrCreateCart = async () => {
    let cart = await Cart.findOne();
    if (!cart) {
        cart = await Cart.create({ items: [], totalPrice: 0 });
    }
    return cart;
};

const calculateCartTotals = (cart) => {
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);
};

//GET
exports.getCart = asyncHandler(async (req, res, next) => {
    let cart = await getOrCreateCart();

    await cart.populate('items.product', 'name price description images');

    res.status(200).json({
        status: 'success',
        message: 'Cart retrieved successfully',
        data: cart
    });
});

//POST
exports.addItemToCart = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const qtyToAdd = Number(quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    if (product.stock < qtyToAdd) {
        return next(new AppError(`Insufficient stock. Only ${product.stock} items available.`, 400));
    }

    let cart = await getOrCreateCart();

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
        const totalProjectedQty = cart.items[existingItemIndex].quantity + qtyToAdd;
        if (product.stock < totalProjectedQty) {
            return next(new AppError(`Cannot add more. Combined cart quantity exceeds available stock.`, 400));
        }
        cart.items[existingItemIndex].quantity = totalProjectedQty;

        cart.items[existingItemIndex].price = product.price;
    } else {
        cart.items.push({
            product: productId,
            quantity: qtyToAdd,
            price: product.price
        });
    }

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate('items.product', 'name price description images');

    res.status(200).json({
        status: 'success',
        message: 'Item added to cart successfully',
        data: cart
    });
});

//PATCH
exports.updateCartItem = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const targetQty = Number(quantity);

    if (isNaN(targetQty) || targetQty < 0) {
        return next(new AppError('Quantity must be a valid non-negative number', 400));
    }

    let cart = await Cart.findOne();
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
        return next(new AppError('Item not found in your cart', 404));
    }

    if (targetQty === 0) {
        cart.items.splice(itemIndex, 1);
    } else {
        const product = await Product.findById(productId);
        if (!product) {
            return next(new AppError('Referenced product no longer exists', 404));
        }
        if (product.stock < targetQty) {
            return next(new AppError(`Insufficient stock. Maximum available: ${product.stock}`, 400));
        }

        cart.items[itemIndex].quantity = targetQty;
        cart.items[itemIndex].price = product.price;
    }

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate('items.product', 'name price description images');

    res.status(200).json({
        status: 'success',
        message: 'Cart updated successfully',
        data: cart
    });
});

//DELETE
exports.removeCartItem = asyncHandler(async (req, res, next) => {
    const { productId } = req.params;

    let cart = await Cart.findOne();
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
        return next(new AppError('Item not found in your cart', 404));
    }

    cart.items.splice(itemIndex, 1);

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate('items.product', 'name price description images');

    res.status(200).json({
        status: 'success',
        message: 'Item removed from cart successfully',
        data: cart
    });
});

//CLEAR ALL
exports.clearCart = asyncHandler(async (req, res, next) => {
    let cart = await Cart.findOne();

    if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
    } else {
        cart = await Cart.create({ items: [], totalPrice: 0 });
    }

    res.status(200).json({
        status: 'success',
        message: 'Cart cleared successfully',
        data: cart
    });
});