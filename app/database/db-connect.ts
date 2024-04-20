import mongoose from "mongoose";
import "dotenv/config";

const CONNECTION: string = process.env.CONNECTION as string;

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(CONNECTION);
    if (connect) {
      console.log("Database Connected Successfully");
    } else {
      console.log("Error Occurred While connecting database");
    }
  } catch (error) {
    console.log("Error Occurred While connecting to database", error);
  }
};
