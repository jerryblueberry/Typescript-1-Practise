"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user-model"));
const generateOtp_1 = require("../utils/generateOtp");
const mailer_1 = require("../utils/mailer");
const saltRounds = 10;
//  password validator
const validatePassword = (password) => {
    // Password must contain at least one capital letter, one symbol, one number, and be at least 8 characters long
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, longitude, latitude } = req.body;
        if (!name || !email || !password || !longitude || !latitude) {
            res.status(400).json({ error: "All Fields are required" });
            return;
        }
        const otp = (0, generateOtp_1.generateOTP)();
        // Check for the existing user
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(402).json({ error: "Email Already exists! Instead try login" });
            return;
        }
        //  password validate
        if (!validatePassword(password)) {
            res.status(400).json({
                error: "Password must contain at least one capital letter, one symbol, one number, and be at least 8 characters long",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const profileImage = req.file ? req.file.path : null;
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
            role: "User",
            profileImage: profileImage || null,
            OTP: otp,
            location: {
                type: "Point",
                coordinates: [longitude, latitude],
            },
        });
        yield newUser.save();
        yield (0, mailer_1.sendSignupMail)(email, otp);
        res.status(200).json({ message: "Successfully Signed Up!,We've send you OTP" });
    }
    catch (error) {
        console.error("Error Occurred ", error);
        res.status(500).json("Internal Server Error");
    }
});
exports.handleSignup = handleSignup;
