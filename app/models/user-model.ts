import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  profileImage?: string;
  OTP?: number;
  status?: boolean;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },

  profileImage: {
    type: String,
  },
  OTP: {
    type: Number,
  },
  status: {
    type: String,
    default: "false", // false is unverified and true is for verified;
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
});

// Add 2dsphere index to the location field
userSchema.index({ location: "2dsphere" });

const User = mongoose.model<IUser>("User", userSchema);
export default User;
