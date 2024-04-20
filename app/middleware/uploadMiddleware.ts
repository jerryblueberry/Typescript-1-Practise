import multer, { StorageEngine } from "multer";
import { Request, Response, NextFunction } from "express";

// Define the storage configuration
const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // desired destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Define the file filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // check if the file type is allowed
  const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file Type. Allowed types: JPEG, JPG, PNG, GIF"));
  }
};

// Define limits for file size
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB limit
};

// Configure Multer with the defined options
const userProfile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("profileImage");

// Middleware to upload image
export const singleUpload = (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    console.error("Error occurred while uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
