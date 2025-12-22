const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

dotenv.config();

const destinations = {
    // Africa
    "Kenya": "international-tours",
    "Morocco": "international-tours",
    "Seychelles": "international-tours",
    "South Africa": "international-tours",
    "Zimbabwe": "international-tours",
    "Tanzania": "international-tours",

    // America
    "Alaska": "international-tours",
    "Canada": "international-tours",
    "Central America": "international-tours",
    "North America": "international-tours",
    "South America": "international-tours",
    "USA": "international-tours",

    // Pacific
    "Australia": "international-tours",
    "Fiji": "international-tours",
    "New Zealand": "international-tours",

    // Asia
    "Bali": "international-tours",
    "Cambodia": "international-tours",
    "China": "international-tours",
    "Hong Kong": "international-tours",
    "Japan": "international-tours",
    "Indonesia": "international-tours",
    "Kazakhstan": "international-tours",
    "Russia": "international-tours",
    "South Korea": "international-tours",
    "Malaysia": "international-tours",
    "Singapore": "international-tours",
    "Philippines": "international-tours",
    "Taiwan": "international-tours",
    "Thailand": "international-tours",
    "Vietnam": "international-tours",
    "Uzbekistan": "international-tours",

    // Europe
    "Austria": "international-tours",
    "Belgium": "international-tours",
    "Bulgaria": "international-tours",
    "Croatia": "international-tours",
    "Czech Republic": "international-tours",
    "Denmark Republic": "international-tours",
    "Finland Republic": "international-tours",
    "France": "international-tours",
    "Germany": "international-tours",
    "Greece": "international-tours",
    "Greenland": "international-tours",
    "Hungary": "international-tours",
    "Iceland": "international-tours",
    "Ireland": "international-tours",
    "Italy": "international-tours",
    "London": "international-tours",
    "Netherlands": "international-tours",
    "Norway": "international-tours",
    "Portugal": "international-tours",
    "Romania": "international-tours",
    // "Russia": "international-tours", // Duplicate key, handled above
    "Slovakia": "international-tours",
    "Spain": "international-tours",
    "Sweden": "international-tours",
    "Switzerland": "international-tours",
    "Turkey": "international-tours",
    "United Kingdom": "international-tours",

    // Island
    "Madagascar": "international-tours",
    "Maldives": "international-tours",
    "Mauritius": "international-tours",
    "Reunion": "international-tours",
    "Sri Lanka": "international-tours",

    // Middle East
    "Israel": "international-tours",
    "Jordan": "international-tours",
    "Oman": "international-tours",
    "Qatar": "international-tours",
    "UAE": "international-tours",
    "Dubai": "international-tours",
    "Egypt": "international-tours",

    // Cruises
    "Cordelia Cruises": "cruises",

    // Honeymoon (Some likely overlap with international, but we should create explicit Honeymoon packages too if user wants)
    // For simplicity, we'll ensure at least one tour exists for these locs with the honeymoon category too if key is unique
    // But object keys are unique. We'll iterate a separate list for honeymoon.
};

const honeymoonDestinations = [
    "Maldives", "Bali", "Mauritius", "Phuket", "Switzerland", "Seychelles",
    "Langkawi", "Paris", "Italy", "Krabi", "Greece", "Thailand", "Dubai",
    "Sri Lanka", "Singapore", "Malaysia", "Croatia", "South Africa",
    "Koh Samui", "Australia", "Spain", "Europe"
];

const seedData = async () => {
    try {
        await connectDB();
        console.log('DB Connected. Seeding...');

        // 1. Seed International/Standard Tours
        for (const [location, category] of Object.entries(destinations)) {
            // Check if exists
            const exists = await Tour.findOne({ location: location, category: category });
            if (!exists) {
                await Tour.create({
                    title: `Best of ${location}`,
                    description: `Experience the breathtaking beauty and culture of ${location} with ur premium holiday package.`,
                    detailedDescription: `# Welcome to ${location}\n\nOur ${location} tour offers a comprehensive 5-day itinerary covering the best sights.\n\n### Highlights\n- City Tour\n- Cultural Experience\n- Luxurious Stay\n\n![${location} View](https://placehold.co/800x400?text=${location.replace(/ /g, '+')})\n\nBook your trip today!`,
                    price: "₹ 85,000",
                    image: `https://placehold.co/600x400?text=${location.replace(/ /g, '+')}`, // Placeholder
                    duration: "6 Days, 5 Nights",
                    location: location,
                    category: category,
                    subcategory: location, // Important for filter match
                    rating: 4.8
                });
                console.log(`Created: ${location}`);
            }
        }

        // 2. Seed Honeymoon Tours (Explicitly category='honeymoon')
        for (const location of honeymoonDestinations) {
            const exists = await Tour.findOne({ location: location, category: 'honeymoon' });
            if (!exists) {
                await Tour.create({
                    title: `Romantic ${location} Honeymoon`,
                    description: `Celebrate your love in ${location}. Special couple benefits included.`,
                    detailedDescription: `# Honeymoon in ${location}\n\nThe perfect getaway for couples.\n\n### Includes\n- Candlelight Dinner\n- Private Transfers\n\n![Romantic ${location}](https://placehold.co/800x400?text=Romantic+${location.replace(/ /g, '+')})`,
                    price: "₹ 1,20,000",
                    image: `https://placehold.co/600x400?text=${location.replace(/ /g, '+')}+Honeymoon`,
                    duration: "7 Days, 6 Nights",
                    location: location,
                    category: "honeymoon",
                    subcategory: location,
                    rating: 5.0
                });
                console.log(`Created Honeymoon: ${location}`);
            }
        }

        console.log('Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
