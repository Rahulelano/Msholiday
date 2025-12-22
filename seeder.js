const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        const adminEmail = 'contact@msholidays.net';
        const adminPassword = 'admin@msholiday$';

        // Check if admin exists
        let adminUser = await User.findOne({ email: adminEmail });

        if (adminUser) {
            console.log(`Admin user "${adminEmail}" already exists. Updating password...`);
            adminUser.password = adminPassword;
            adminUser.isAdmin = true;
            await adminUser.save();
            console.log('Admin User Updated Successfully!');
        } else {
            adminUser = new User({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                isAdmin: true,
            });
            await adminUser.save();
            console.log('Admin User Created Successfully!');
        }

        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
