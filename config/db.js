const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    let mongUri = MONGO_URI ?? "";
    await mongoose.connect(mongUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if unable to connect
  }
};

module.exports = connectDB;
