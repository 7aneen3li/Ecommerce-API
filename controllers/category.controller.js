const Category = require('../models/category.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');


const slungify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[\s\W_]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

//POST
exports.createCategory = asyncHandler(async (req, res, next) => {
    if (req.body.name) {
        req.body.slug = slungify(req.body.name);
    }

    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        data: newCategory
    });
});

//GET
exports.getAllCategories = asyncHandler(async (req, res, next) =>{
    const categories = await Category.find();

    res.status(200).json({
        status: 'success',
        message: 'Categories retrieved successfully',
        data: categories
    });
});

//GET..:id
exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError('No category found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Category retrieved successfully',
        data: category
    });
});

//PATCH
exports.updateCategory = asyncHandler(async (req, res, next) => {
    if (req.body.name) {
        req.body.slug = slungify(req.body.name);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        return next(new AppError('No category found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Category updated successfully',
        data: updatedCategory
    });
});

//DELETE
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError('No category found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully',
        data: null
    });
});