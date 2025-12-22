const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        },
        city: {
            type: String,
        },
        destination: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
