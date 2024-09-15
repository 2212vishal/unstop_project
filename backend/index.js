const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const seatRouter = require("./routes/seatRoutes");
const { seedSeats } = require("./controllers/seatController");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database
database.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Automatically seed seats on server start
seedSeats();

// Routes
app.use("/api/v1/seats", seatRouter);

// Test the server
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is up and running!",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
