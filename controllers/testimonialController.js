const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = asyncHandler(async (req, res) => {
    const { name, message, rating, image } = req.body;

    const testimonial = new Testimonial({
        name,
        message,
        rating,
        image,
    });

    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
        await testimonial.deleteOne();
        res.json({ message: 'Testimonial removed' });
    } else {
        res.status(404);
        throw new Error('Testimonial not found');
    }
});

module.exports = {
    getTestimonials,
    createTestimonial,
    deleteTestimonial,
};
