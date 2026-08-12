const express = require("express");

const {
    createBooking,
    getPackageBookings,
    getMyBookings
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// CREATE BOOKING
// ==========================================

router.post(
    "/",
    protect,
    createBooking
);


// ==========================================
// GET BOOKINGS FOR A PACKAGE
// Only the package owner can access these
// ==========================================

router.get(
    "/package/:packageId",
    protect,
    getPackageBookings
);


// ==========================================
// GET MY BOOKINGS
// ==========================================

router.get(
    "/my",
    protect,
    getMyBookings
);


module.exports = router;