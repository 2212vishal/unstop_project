const validateSeats = (req, res, next) => {
    const seatCount = req.body.seatCount;

    if (seatCount > 0 && seatCount <= 7) {
        next();
    } else {
        res.status(400).json({ message: "Cannot reserve more than 7 seats at a time." });
    }
};

module.exports = { validateSeats };
