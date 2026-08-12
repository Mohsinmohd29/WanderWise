const express = require("express");

const {
    getPackages,
    getPackageById,
    getMyPackages,
    createPackage,
    updatePackage,
    deletePackage
} = require("../controllers/packageController");

const protect = require("../middleware/authMiddleware");

const multer = require("multer");

const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

const router = express.Router();


// ================= PUBLIC ROUTES =================

// Get all packages
router.get("/", getPackages);

// Get packages created by logged-in user
router.get("/my", protect, getMyPackages);

// Get one package
router.get("/:id", getPackageById);


// ================= PROTECTED ROUTES =================

// Create package
router.post(
    "/",
    protect,
    upload.single("image"),
    createPackage
);


// Update package
router.put(
    "/:id",
    protect,
    upload.single("image"),
    updatePackage
);


// Delete package
router.delete(
    "/:id",
    protect,
    deletePackage
);


module.exports = router;