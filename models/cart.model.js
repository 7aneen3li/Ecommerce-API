const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product reference is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        default: 1
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
}, {_id: false});

const cartSchema = new mongoose.Schema(
   {
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'User reference is required'],
    //     unique: true
    // },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be neative'],
        default: 0
    }
   },
   {
    timestamps: true
   }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;