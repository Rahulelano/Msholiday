const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

dotenv.config();

const weddingDestinations = {
    // India
    "Agra": "wedding",
    "Andaman": "wedding",
    "Goa": "wedding",
    "Jaipur": "wedding",
    "Jaisalmer": "wedding",
    "Jodhpur": "wedding",
    "Kerala": "wedding",
    "Udaipur": "wedding",

    // International
    "Bali": "wedding",
    "Dubai": "wedding",
    "Malaysia": "wedding",
    "Sri Lanka": "wedding",
    "Thailand": "wedding"
};

const seedWedding = async () => {
    try {
        await connectDB();
        console.log('DB Connected. Seeding Wedding Tours...');

        for (const [location, category] of Object.entries(weddingDestinations)) {
            // Check if exists
            const exists = await Tour.findOne({ location: location, category: category });
            if (!exists) {
                await Tour.create({
                    title: `Dream Wedding in ${location}`,
                    description: `Plan your perfect destination wedding in ${location}. Luxury and romance combined.`,
                    detailedDescription: `# Destination Wedding: ${location}\n\nMake your special day unforgettable with a wedding in ${location}.\n\n### Package Includes\n- Venue Booking\n- Catering & Decor\n- Guest Accommodation\n- Honeymoon Suite\n\n![Wedding in ${location}](https://placehold.co/800x400?text=Wedding+in+${location.replace(/ /g, '+')})\n\nContact us to customize your dream wedding!`,
                    price: "Price on Request", // typical for weddings
                    image: `https://placehold.co/600x400?text=Wedding+in+${location.replace(/ /g, '+')}`,
                    duration: "Flexible",
                    location: location,
                    category: category,
                    subcategory: location,
                    rating: 4.9
                });
                console.log(`Created Wedding Package: ${location}`);
            } else {
                console.log(`Skipped (Exists): ${location}`);
            }
        }

        console.log('Wedding Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedWedding();
