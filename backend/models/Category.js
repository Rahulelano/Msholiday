const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            requried: true,
        },
        image: {
            type: String, // URL for the hero banner of this category page
            required: true,
        },
        menuPlacement: {
            type: String,
            enum: ['packages', 'india', 'international', 'honeymoon', 'main'],
            default: 'packages', // Where in the navbar it should mainly appear
        }
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
