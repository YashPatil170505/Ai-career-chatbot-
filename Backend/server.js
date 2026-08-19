console.log("🚀 Server file started");

// Load environment variables
require("dotenv").config();

// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// App init
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug env
console.log("Mongo URI loaded:", process.env.MONGO_URI ? "YES" : "NO");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    authSource: "admin",
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// ✅ IMPORT ROUTES (AFTER EXPRESS INIT)
let resumeRoutes;
try {
  resumeRoutes = require("./routes/resume");
  console.log("✅ Routes imported successfully:", typeof resumeRoutes);
} catch (error) {
  console.error("❌ Error importing routes:", error.message);
  process.exit(1);
}

// ✅ USE ROUTES
if (resumeRoutes && typeof resumeRoutes === "function") {
  app.use("/api/resume", resumeRoutes);
  console.log("✅ Routes registered");
} else {
  console.error("❌ resumeRoutes is not a valid router:", typeof resumeRoutes);
}

// Test route
app.get("/", (req, res) => {
  res.send("AI Career Chatbot Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server is listening on port ${PORT}`);
});

const careerRoutes = require("./routes/career");
app.use("/api/career", careerRoutes);