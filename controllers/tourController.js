const asyncHandler = require('express-async-handler');
const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
const getTours = asyncHandler(async (req, res) => {
    const tours = await Tour.find({});
    res.json(tours);
});

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
const getTourById = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);

    if (tour) {
        res.json(tour);
    } else {
        res.status(404);
        throw new Error('Tour not found');
    }
});

// @desc    Create a tour
// @route   POST /api/tours
// @access  Private/Admin
const createTour = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        image,
        duration,
        location,
        category,
        subcategory,
        rating,
        detailedDescription
    } = req.body;

    const tour = new Tour({
        title,
        description,
        price,
        image,
        duration,
        location,
        category,
        subcategory,
        rating,
        detailedDescription
    });

    const createdTour = await tour.save();
    res.status(201).json(createdTour);
});

// @desc    Update a tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
const updateTour = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        image,
        duration,
        location,
        category,
        subcategory,
        rating,
        detailedDescription
    } = req.body;

    const tour = await Tour.findById(req.params.id);

    if (tour) {
        tour.title = title;
        tour.description = description;
        tour.price = price;
        tour.image = image;
        tour.duration = duration;
        tour.location = location;
        tour.category = category;
        tour.subcategory = subcategory;
        tour.rating = rating;
        tour.detailedDescription = detailedDescription;

        const updatedTour = await tour.save();
        res.json(updatedTour);
    } else {
        res.status(404);
        throw new Error('Tour not found');
    }
});

// @desc    Delete a tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteTour = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id);

    if (tour) {
        await tour.deleteOne();
        res.json({ message: 'Tour removed' });
    } else {
        res.status(404);
        throw new Error('Tour not found');
    }
});

module.exports = {
    getTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
};
