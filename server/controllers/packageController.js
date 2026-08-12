const Package = require("../models/Package");
const Booking = require("../models/Booking");


// Get all packages
const getPackages = async (req, res) => {

    try {

        const packages = await Package
            .find()
            .populate("owner", "name");

        res.status(200).json(packages);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch packages",
            error: error.message
        });

    }
};


// Get one package
const getPackageById = async (req, res) => {

    try {

        const packageData = await Package
            .findById(req.params.id)
            .populate("owner", "name email");

        if (!packageData) {

            return res.status(404).json({
                message: "Package not found"
            });

        }

        res.status(200).json(packageData);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch package",
            error: error.message
        });

    }
};

// Get packages created by the logged-in user
const getMyPackages = async (req, res) => {

    try {

        const packages = await Package
            .find({ owner: req.user.id })
            .populate("owner", "name");

        res.status(200).json(packages);

    } catch (error) {

        console.error("GET MY PACKAGES ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch your packages",
            error: error.message
        });

    }
};

// Create package
const createPackage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "Package image is required"
            });

        }


        const itinerary = req.body.itinerary
            ? JSON.parse(req.body.itinerary)
            : [];

        const included = req.body.included
            ? JSON.parse(req.body.included)
            : [];


        if (itinerary.length === 0) {

            return res.status(400).json({
                message: "At least one itinerary day is required"
            });

        }


        if (included.length === 0) {

            return res.status(400).json({
                message: "At least one included feature is required"
            });

        }


        const newPackage = await Package.create({

            title: req.body.title,

            destination: req.body.destination,

            description: req.body.description,

            price: Number(req.body.price),

            duration: req.body.duration,

            availableSeats: Number(req.body.availableSeats),

            image: req.file.path,

            itinerary: itinerary,

            included: included,

            owner: req.user.id

        });


        res.status(201).json(newPackage);

    } catch (error) {

        console.error("CREATE PACKAGE ERROR:", error);

        res.status(400).json({
            message: "Failed to create package",
            error: error.message
        });

    }
};

// Update package
// Update package
const updatePackage = async (req, res) => {

    try {

        const packageData = await Package.findById(req.params.id);

        if (!packageData) {

            return res.status(404).json({
                message: "Package not found"
            });

        }


        // Only the owner can update the package
        if (packageData.owner.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not allowed to update this package"
            });

        }


        const updateData = {

            title: req.body.title,

            destination: req.body.destination,

            description: req.body.description,

            price: Number(req.body.price),

            duration: req.body.duration,

            availableSeats: Number(
                req.body.availableSeats
            )

        };


        // Update itinerary if provided
        if (req.body.itinerary) {

            updateData.itinerary =
                JSON.parse(req.body.itinerary);

        }


        // Update included features if provided
        if (req.body.included) {

            updateData.included =
                JSON.parse(req.body.included);

        }


        // Update image only if a new image was uploaded
        if (req.file) {

            updateData.image = req.file.path;

        }


        const updatedPackage =
            await Package.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            ).populate("owner", "name");


        res.status(200).json({
            message: "Package updated successfully",
            package: updatedPackage
        });


    } catch (error) {

        console.error("UPDATE PACKAGE ERROR:", error);

        res.status(400).json({
            message: "Failed to update package",
            error: error.message
        });

    }
};


// Delete package
// Delete package
const deletePackage = async (req, res) => {

    try {

        const packageData = await Package.findById(req.params.id);

        if (!packageData) {

            return res.status(404).json({
                message: "Package not found"
            });

        }


        // Only the owner can delete the package
        if (packageData.owner.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not allowed to delete this package"
            });

        }


        // Delete all bookings associated with this package
        await Booking.deleteMany({
            package: req.params.id
        });


        // Delete the package
        await Package.findByIdAndDelete(req.params.id);


        res.status(200).json({
            message: "Package and associated bookings deleted successfully"
        });

    } catch (error) {

        console.error("DELETE PACKAGE ERROR:", error);

        res.status(500).json({
            message: "Failed to delete package",
            error: error.message
        });

    }

};


module.exports = {
    getPackages,
    getPackageById,
    getMyPackages,
    createPackage,
    updatePackage,
    deletePackage
};