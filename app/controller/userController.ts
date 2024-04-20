import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user-model";
import { generateOTP } from "../utils/generateOtp";
import { sendSignupMail } from "../utils/mailer";

const saltRounds: number = 10;

// Password validator
const validatePassword = (password: string): boolean => {
  // Password must contain at least one capital letter, one symbol, one number, and be at least 8 characters long
  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export const handleSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, longitude, latitude } = req.body;

    // Check if any required fields are missing
    if (!name || !email || !password || !longitude || !latitude) {
      res.status(400).json({ error: "All Fields are required" });
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      res.status(400).json({
        error:
          "Password must contain at least one capital letter, one symbol, one number, and be at least 8 characters long",
      });
      return;
    }

    // Check for existing user
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(402).json({ error: "Email Already exists! Instead try login" });
      return;
    }

    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const profileImage: string | null = req.file ? req.file.path : null;

    // Generate OTP
    const otp = generateOTP();

    // Create new user
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "User",
      profileImage,
      OTP: otp,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await newUser.save();
    res.status(200).json({ message: "Successfully Signed Up!,We've send you OTP" });
    await sendSignupMail(email, otp);
  } catch (error) {
    console.error("Error Occurred ", error);
    res.status(500).json("Internal Server Error");
  }
};
