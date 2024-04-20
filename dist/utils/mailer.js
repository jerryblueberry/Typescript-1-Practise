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
exports.sendSignupMail = void 0;
const sgnupMailTemplate_1 = require("../emailTemplates/sgnupMailTemplate");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mjml_1 = __importDefault(require("mjml"));
const sendSignupMail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "jerrytechs83@gmail.com",
                pass: "xhld yvin catr neyk",
            },
        });
        const { html } = (0, mjml_1.default)((0, sgnupMailTemplate_1.signupMailTemplate)(otp));
        const mailOptions = {
            from: "jerrytechs83@gmail.com",
            to: email,
            subject: "Signup Verification OTP",
            html,
        };
        yield transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    }
    catch (error) { }
});
exports.sendSignupMail = sendSignupMail;
