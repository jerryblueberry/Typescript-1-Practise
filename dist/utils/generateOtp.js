"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    const otpLength = 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp;
};
exports.generateOTP = generateOTP;
