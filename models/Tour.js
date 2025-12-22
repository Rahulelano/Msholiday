const mongoose = require('mongoose');

const tourSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String, // Changed to String to allow "On Request" or currency symbols if needed, or keep number if strict
            required: true,
        },
        detailedDescription: {
            type: String, // For rich content/long description
            required: false,
        },
        image: {
            type: String, // URL
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            // enum: ['india-tours', 'international-tours', 'honeymoon', 'group-tours', 'wedding'] // Optional validation
        },
        subcategory: {
            type: String, // e.g. 'kerala', 'dubai' - used for URL matching or additional filtering
        },
        rating: {
            type: Number,
            required: true,
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
