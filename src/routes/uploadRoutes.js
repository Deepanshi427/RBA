const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // store in /uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // unique filename
    }
});

// File filter for .png and .jpg only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Only .png and .jpg files are allowed"), false);
    }
};

// Max file size 2MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: fileFilter
});

// Single file upload route
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully", fileUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
