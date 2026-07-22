const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product reference is required']
    },
    name: {
        type: String,
        required: [true, 'Product name snapshot is required']
    },
    price: {
        type: Number,
        required: [true, 'Price at purchase is required'],
        min: [0, 'Price cannot be negative'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
    }
}, {_id: false});

const orderSchema = new mongoose.Schema(
   {
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount cannot be negative'],
    },
    shippingAddress: {
        type: String,
        required: [true, 'Shipping address is required'],
        trim: true
    },
    status: {
        type: String,
        required: [true, 'Order status is required'],
        enum: {
            values: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            message: "{VALUE} is not a valid order status"
        },
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        required: [true, 'Payment status is required'],
        enum: {
            values: ['Pending', 'Paid', 'Failed', 'Refunded'],
            message: "{VALUE} is not a valid payment status"
        },
        default: 'Pending'
    }
   },
   {
    timestamps: true
   }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;