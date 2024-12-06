const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = "mongodb://127.0.0.1:27017/carsDB"; // Replace with MongoDB URI if using Atlas

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", carRoutes);

// Start the server
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
}

startServer();
