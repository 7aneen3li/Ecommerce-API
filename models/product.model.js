const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minlength: [2, 'Product name must be at least 2 characters'],
            maxlength: [100, 'Product name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative'],
        },
        stock: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        images: {
            type: [String],
            default: [],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Product must belong to a category'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

productSchema.virtual('inStock').get(function () {
    return this.stock > 0;
});

const Product = mongoose.model('Product' , productSchema);

module.exports = Product;