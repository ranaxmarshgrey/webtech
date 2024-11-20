const mongoose = require("mongoose");

const connectToMongoose = async () => {
  const mongoURI = "mongodb://localhost:27017/bank";  // Access MONGO_URI from the environment
  if (!mongoURI) {
    throw new Error("MongoDB URI is missing from the environment variables.");
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;  // Rethrow the error to be handled elsewhere
  }
};

module.exports = connectToMongoose;
