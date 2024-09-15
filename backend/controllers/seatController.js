const Seat = require("../models/seatModel");

// GET seats
exports.getSeats = async (req, res) => {
    try {
        const seats = await Seat.find().sort({ seatNum: 1 });
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch seats." });
    }
};

// POST reserve seats
exports.reserveSeats = async (req, res) => {
    let numSeats = req.body.seatCount;  // Change const to let
    const seats = await Seat.find().sort({ seatNum: 1 });

    let bookedSeats = [];

    // Try booking seats in the same row
    let i = 0;
    while (i < seats.length && i <= 71) {
        let available = 0;
        for (let j = i; j < i + 7; j++) {
            if (!seats[j].isReserved) available++;
        }

        if (available >= numSeats) {
            for (let j = i; j < i + 7 && numSeats > 0; j++) {
                if (!seats[j].isReserved) {
                    bookedSeats.push(seats[j].seatNum);
                    await Seat.findByIdAndUpdate(seats[j]._id, { isReserved: true });
                    numSeats--;  // Decrement numSeats
                }
            }
            break;
        } else {
            i += 7;
        }
    }

    if (bookedSeats.length > 0) {
        res.status(200).json(bookedSeats);
    } else {
        const availableSeats = await Seat.find({ isReserved: false }).sort({ seatNum: 1 });

        if (availableSeats.length < numSeats) {
            return res.status(400).json({ message: "Not enough seats available." });
        }

        let differences = [];
        let start = 0;
        while (start <= availableSeats.length - numSeats) {
            let first = availableSeats[start].seatNum;
            let last = availableSeats[start + numSeats - 1].seatNum;
            differences.push(last - first);
            start += numSeats;
        }

        const minDiff = Math.min(...differences);
        const minIndex = differences.indexOf(minDiff);

        for (let j = minIndex * numSeats; j < minIndex * numSeats + numSeats; j++) {
            bookedSeats.push(availableSeats[j].seatNum);
            await Seat.findByIdAndUpdate(availableSeats[j]._id, { isReserved: true });
        }

        res.status(200).json(bookedSeats);
    }
};

// PATCH reset seats
exports.resetSeats = async (req, res) => {
    try {
        await Seat.updateMany({ isReserved: true }, { isReserved: false });
        res.status(200).json({ message: "All seats are now available." });
    } catch (error) {
        res.status(500).json({ message: "Failed to reset seats." });
    }
};



// Function to seed seats in the database
exports.seedSeats = async () => {
    const seatCount = await Seat.countDocuments();  // Count existing seats

    // If there are fewer than 80 seats, seed the missing ones
    if (seatCount < 80) {
        let seatsToCreate = [];
        for (let i = seatCount + 1; i <= 80; i++) {
            seatsToCreate.push({ seatNum: i, isReserved: false });
        }
        await Seat.insertMany(seatsToCreate);
        console.log("Database seeded with 80 seats");
    } else {
        console.log("Seats already exist");
    }
};

// GET seats
exports.getSeats = async (req, res) => {
    try {
        await exports.seedSeats();  // Ensure 80 seats are seeded before fetching

        const seats = await Seat.find().sort({ seatNum: 1 });
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch seats." });
    }
};
