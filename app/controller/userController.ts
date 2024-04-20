import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user-model";
import { generateOTP } from "../utils/generateOtp";
import { sendSignupMail } from "../utils/mailer";

const saltRounds: number = 10;

export const handleSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, longitude, latitude } = req.body;

    if (!name || !email || !password || !longitude || !latitude) {
      res.status(400).json({ error: "All Fields are required" });
      return;
    }

    const otp = generateOTP();

    // Check for the existing user
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(402).json({ error: "Email Already exists! Instead try login" });
      return;
    }

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "User",
      OTP: otp,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await newUser.save();
    await sendSignupMail(email, otp);
    res.status(200).json({ message: "Successfully Signed Up!,We've send you OTP" });
  } catch (error) {
    console.error("Error Occurred ", error);
    res.status(500).json("Internal Server Error");
  }
};
