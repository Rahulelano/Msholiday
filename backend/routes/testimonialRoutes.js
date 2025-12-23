const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    createTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getTestimonials).post(protect, admin, createTestimonial);
router.route('/:id').delete(protect, admin, deleteTestimonial);

module.exports = router;
