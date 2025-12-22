const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

dotenv.config();

const honeymoonDestinations = {
    // India
    "Goa": "honeymoon",
    "Kerala": "honeymoon",
    "Shimla": "honeymoon",
    "Manali": "honeymoon",
    "Andaman": "honeymoon",
    "Himachal": "honeymoon",
    "Munnar": "honeymoon",
    "Kodaikanal": "honeymoon",
    "Coorg": "honeymoon",
    "Ooty": "honeymoon",
    "Kashmir": "honeymoon",
    "Darjeeling": "honeymoon",

    // International
    "Maldives": "honeymoon",
    "Bali": "honeymoon",
    "Mauritius": "honeymoon",
    "Phuket": "honeymoon",
    "Switzerland": "honeymoon",
    "Seychelles": "honeymoon",
    "Langkawi": "honeymoon",
    "Paris": "honeymoon",
    "Italy": "honeymoon",
    "Krabi": "honeymoon",
    "Greece": "honeymoon",
    "Thailand": "honeymoon",
    "Dubai": "honeymoon",
    "Sri Lanka": "honeymoon",
    "Singapore": "honeymoon",
    "Malaysia": "honeymoon",
    "Croatia": "honeymoon",
    "South Africa": "honeymoon",
    "Koh Samui": "honeymoon",
    "Australia": "honeymoon",
    "Spain": "honeymoon",
    "Europe": "honeymoon"
};

const seedHoneymoon = async () => {
    try {
        await connectDB();
        console.log('DB Connected. Seeding Honeymoon Tours...');

        for (const [location, category] of Object.entries(honeymoonDestinations)) {
            // Check if exists
            const exists = await Tour.findOne({ location: location, category: category });
            if (!exists) {
                await Tour.create({
                    title: `Romantic Getaway to ${location}`,
                    description: `Experience the ultimate romantic escape in ${location}. Perfect for newlyweds.`,
                    detailedDescription: `# Honeymoon in ${location}\n\nCelebrate your love story with our exclusive ${location} honeymoon package.\n\n### Romantic Inclusions\n- Candlelight Beach Dinner\n- Private Couples Massage\n- Luxury Suite Upgrade\n- Sunset Cruise\n\n![Romantic ${location}](https://placehold.co/800x400?text=Honeymoon+in+${location.replace(/ /g, '+')})\n\n### Itinerary\n**Day 1:** Arrival & Welcome Drinks\n**Day 2:** Private Tour & Leisure\n**Day 3:** Romantic Dinner\n\nBook your dream honeymoon now!`,
                    price: "₹ 1,50,000",
                    image: `https://placehold.co/600x400?text=Honeymoon+in+${location.replace(/ /g, '+')}`,
                    duration: "6 Days, 5 Nights",
                    location: location,
                    category: category,
                    subcategory: location,
                    rating: 5.0
                });
                console.log(`Created Honeymoon Package: ${location}`);
            } else {
                console.log(`Skipped (Exists): ${location}`);
            }
        }

        console.log('Honeymoon Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedHoneymoon();
