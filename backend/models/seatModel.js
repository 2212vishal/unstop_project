const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatNum: Number,
    isReserved: Boolean,
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
