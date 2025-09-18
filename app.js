const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// MongoDB
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));