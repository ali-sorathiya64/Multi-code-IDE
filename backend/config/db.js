const mongoose = require("mongoose");
require("dotenv").config();
// const conncetion_string ="mongodb+srv://andrew:garfield@project.pxx38.mongodb.net/code-IDE"


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {
    
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
