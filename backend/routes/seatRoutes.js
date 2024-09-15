const express = require("express");
const { getSeats, reserveSeats, resetSeats } = require("../controllers/seatController");
const { validateSeats } = require("../middlewares/seatValidation");

const seatRouter = express.Router();

seatRouter.get("/", getSeats);
seatRouter.post("/reserve", validateSeats, reserveSeats);
seatRouter.patch("/reset", resetSeats);

module.exports = seatRouter;
