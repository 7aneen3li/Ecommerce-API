const Product = require('../models/product.model');
const Category = require('../models/category.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

//POST
exports.createProduct = asyncHandler(async (req, res, next) => {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
        return next(new AppError('Cannot create product: Referenced category does not exist', 404));
    }

    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        data: newProduct
    });
});

//GET all (with filtering)
exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const queryObj = {};

    if (req.query.search) {
        queryObj.$or = [
            { name: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } }
        ];
    }

    if (req.query.category) {
        queryObj.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
        queryObj.price = {};
        if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
        if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
    }

    if (req.query.inStock === 'true') {
        queryObj.stock = { $gt: 0 };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(queryObj)
        .populate('category', 'name description')
        .skip(skip)
        .limit(limit);

    const totalProducts = await Product.countDocuments(queryObj);

    res.status(200).json({
        status: 'success',
        message: 'Products retrieved successfully',
        results: products.length,
        pagination: {
            totalItems: totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            itemsPerPage: limit
        },
        data: products
    });
});

//GET..:id
exports.getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category', 'name description');

    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Product retrieved successfully',
        data: product
    });
});

//PATCH
exports.updateProduct = asyncHandler(async (req, res, next) => {
    if (req.body.category) {
        const categoryExists = await Category.findById(req.body.category);
        if (!categoryExists) {
            return next(new AppError('Cannot update product: Referenced category does not exist', 404));
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    ).populate('category', 'name description');

    if (!updatedProduct) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: updatedProduct
    });
});

//DELETE
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully',
        data: null
    });
});