"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleUpload = void 0;
const multer_1 = __importDefault(require("multer"));
// Define the storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "files/"); // desired destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
// Define the file filter function
const fileFilter = (req, file, cb) => {
    // check if the file type is allowed
    const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file Type. Allowed types: JPEG, JPG, PNG, GIF"));
    }
};
// Define limits for file size
const limits = {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
};
// Configure Multer with the defined options
const userProfile = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
}).single("profileImage");
// Middleware to upload image
const singleUpload = (req, res, next) => {
    try {
        // Execute Multer middleware
        userProfile(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            // Check if file exists in request
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            // Move to next middleware
            next();
        });
    }
    catch (error) {
        console.error("Error occurred while uploading image:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.singleUpload = singleUpload;
