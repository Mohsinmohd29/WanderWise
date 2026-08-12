const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        itinerary: [
            {
                day: {
                    type: String,
                    required: true
                },

                title: {
                    type: String,
                    required: true
                },

                description: {
                    type: String,
                    required: true
                }
            }
        ],

        included: [
            {
                type: String
            }
        ],

        availableSeats: {
            type: Number,
            default: 20
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },

    {
        timestamps: true
    },
   
);

module.exports = mongoose.model("Package", packageSchema);