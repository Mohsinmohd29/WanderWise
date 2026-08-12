const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: true
        },

        numberOfPeople: {
            type: Number,
            required: true,
            min: 1
        },

        travelDate: {
            type: Date,
            required: true
        },

        pricePerPerson: {
            type: Number,
            required: true
        },

        totalPrice: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["confirmed", "cancelled"],
            default: "confirmed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);