require('dotenv').config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

// connect to mongodb
const connectToMongoose = require("./config/db");

// middlewares
// express json parser middleware
app.use(express.json());

// cors middleware
const { corsProOptions } = require("./config/corsConfig");
app.use(cors(corsProOptions));

// Apply the rate limiting middleware to API calls only
const { apiLimiter } = require("./middlewares/rateLimitMiddleware/rateLimitMiddleware");
app.use("/api", apiLimiter);

// users Router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

// admins Router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

// account Router
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

// account requests Router
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

// serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "Frontend", "dist", "index.html"))
  );
}

// Use async/await with try-catch for cleaner error handling
const startServer = async () => {
  try {
    // Ensure the MongoDB connection works
    await connectToMongoose();
    // Start the server after successful connection
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

// Call the startServer function to begin
startServer();
