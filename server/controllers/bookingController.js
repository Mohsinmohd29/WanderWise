const Booking = require("../models/Booking");
const Package = require("../models/Package");


const createBooking = async (req, res) => {

    try {

        const {
            packageId,
            numberOfPeople,
            travelDate
        } = req.body;


        // ================= VALIDATION =================

        if (
            !packageId ||
            !numberOfPeople ||
            !travelDate
        ) {

            return res.status(400).json({
                message:
                    "Package, number of people and travel date are required"
            });

        }


        const people = Number(numberOfPeople);


        if (!Number.isInteger(people) || people < 1) {

            return res.status(400).json({
                message:
                    "Number of people must be at least 1"
            });

        }


        // ================= DATE VALIDATION =================

        const selectedDate = new Date(travelDate);


        if (isNaN(selectedDate.getTime())) {

            return res.status(400).json({
                message: "Invalid travel date"
            });

        }


        // Don't allow booking for a date in the past

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        selectedDate.setHours(0, 0, 0, 0);


        if (selectedDate < today) {

            return res.status(400).json({
                message:
                    "Travel date cannot be in the past"
            });

        }


        // ================= FIND PACKAGE =================

        const packageData =
            await Package.findById(packageId);


        if (!packageData) {

            return res.status(404).json({
                message: "Package not found"
            });

        }


        // ================= SEAT CHECK =================

        if (packageData.availableSeats <= 0) {

            return res.status(400).json({
                message:
                    "Sorry, this package is fully booked"
            });

        }


        if (
            people >
            packageData.availableSeats
        ) {

            return res.status(400).json({
                message:
                    `Only ${packageData.availableSeats} seats are available`
            });

        }


        // ================= PRICE =================

        const pricePerPerson =
            packageData.price;

        const totalPrice =
            pricePerPerson * people;


        // ================= CREATE BOOKING =================

        const booking = await Booking.create({

            user: req.user.id,

            package: packageData._id,

            numberOfPeople: people,

            travelDate: selectedDate,

            pricePerPerson,

            totalPrice,

            status: "confirmed"

        });


        // ================= REDUCE SEATS =================

        packageData.availableSeats -= people;

        await packageData.save();


        // ================= RESPONSE =================

        res.status(201).json({

            message:
                "Booking confirmed successfully",

            booking

        });


    } catch (error) {

        console.error(
            "BOOKING ERROR:",
            error
        );


        res.status(500).json({

            message:
                "Failed to create booking",

            error: error.message

        });

    }

};

// Get all bookings for a package
// Only the owner of the package can access this
const getPackageBookings = async (req, res) => {

    try {

        const { packageId } = req.params;

        // Find the package
        const packageData = await Package.findById(packageId);

        if (!packageData) {

            return res.status(404).json({
                message: "Package not found"
            });

        }


        // Check if logged-in user is the owner
        if (packageData.owner.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not allowed to view these bookings"
            });

        }


        // Find all bookings for this package
        const bookings = await Booking.find({
            package: packageId
        })
        .populate("user", "name email")
        .sort({ createdAt: -1 });


        res.status(200).json(bookings);

    } catch (error) {

        console.error("GET PACKAGE BOOKINGS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch package bookings"
        });

    }
};

// Get bookings of the logged-in user
const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id
        })
            .populate("package")
            .populate("user", "name email")
            .sort({ createdAt: -1 });


        res.status(200).json(bookings);

    } catch (error) {

        console.error(
            "GET MY BOOKINGS ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message
        });

    }
};

module.exports = {
    createBooking,
    getPackageBookings,
    getMyBookings
};