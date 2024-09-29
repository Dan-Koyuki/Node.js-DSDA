// Load environment variables from .env file
import dotenv from "dotenv";

// Import required packages
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import RoleRoute from "./route/role.route.js";

// Create an Express application
const app = express();

dotenv.config();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// CORS Settings
app.use(cors());
app.use((req, res, next) => {
  // Allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Define allowed methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // Define allowed headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Continue to the next middleware
  next();
});
app.options("*", (req, res) => {
  // Respond to preflight requests
  res.status(200).end();
});

// Database connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use("/api/role", RoleRoute)


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
