const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/Tour');
const connectDB = require('./config/db');

dotenv.config();

const indiaDestinations = {
    // North India
    "Agra": "india-tours",
    "Delhi": "india-tours",
    "Jaipur": "india-tours",
    "Jammu and Kashmir": "india-tours",
    "Ladakh": "india-tours",
    "Manali": "india-tours",
    "Shimla": "india-tours",
    "Uttarakhand": "india-tours",

    // South India
    "Bangalore": "india-tours",
    "Hyderabad": "india-tours",
    "Karnataka": "india-tours",
    "Kerala": "india-tours",
    "Kochi": "india-tours",
    "Mysore": "india-tours",
    "Ooty": "india-tours",
    "Tamil Nadu": "india-tours",

    // North East
    "Arunachal Pradesh": "india-tours",
    "Gangtok": "india-tours",
    "Pelling": "india-tours",
    "Sikkim": "india-tours",

    // East India
    "Bihar": "india-tours",
    "Darjeeling": "india-tours",
    "Kolkata": "india-tours",
    "West Bengal": "india-tours",

    // West India
    "Ahmedabad": "india-tours",
    "Goa": "india-tours",
    "Maharashtra": "india-tours",
    "Mumbai": "india-tours",
    "Pune": "india-tours",
    "Rajasthan": "india-tours",

    // Spiritual
    "Ayodhya": "india-tours",
    "Tirupati": "india-tours"
};

const seedIndia = async () => {
    try {
        await connectDB();
        console.log('DB Connected. Seeding India Tours...');

        for (const [location, category] of Object.entries(indiaDestinations)) {
            // Check if exists
            const exists = await Tour.findOne({ location: location, category: category });
            if (!exists) {
                await Tour.create({
                    title: `Discover ${location}`,
                    description: `Experience the rich heritage and beauty of ${location} with our exclusive package.`,
                    detailedDescription: `# Welcome to ${location}\n\nOur ${location} tour offers a perfect blend of culture, nature, and relaxation.\n\n### Tour Highlights\n- Guided City Tour\n- Heritage Sites\n- Traditional Cuisine\n\n![${location} View](https://placehold.co/800x400?text=${location.replace(/ /g, '+')})\n\n### Itinerary\n**Day 1:** Arrival and Welcome\n**Day 2:** Sightseeing\n**Day 3:** Cultural Events\n\nBook your trip today!`,
                    price: "₹ 25,000",
                    image: `https://placehold.co/600x400?text=${location.replace(/ /g, '+')}`, // Placeholder
                    duration: "4 Days, 3 Nights",
                    location: location,
                    category: category,
                    subcategory: location, // Important for filter match
                    rating: 4.7
                });
                console.log(`Created: ${location}`);
            } else {
                console.log(`Skipped (Exists): ${location}`);
            }
        }

        console.log('India Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedIndia();
