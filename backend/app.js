require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
