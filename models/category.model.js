const mongoose = require('mongoose');

const generateSlug = (name) => {
    return name
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[\s\W_]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            unique: true,
            trim: true,
            minlength: [2, 'Category name must be at least 2 characters'],
            maxlength: [50, 'Category name must be less than 50 characters'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        }
    },
    {
        timestamps: true
    }
);

categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = generateSlug(this.name);
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;