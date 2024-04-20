import { signupMailTemplate } from "../emailTemplates/sgnupMailTemplate";
import nodemailer from "nodemailer";
import mjml2html from "mjml";

export const sendSignupMail = async (email: string, otp: number) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jerrytechs83@gmail.com",
        pass: "xhld yvin catr neyk",
      },
    });

    const { html } = mjml2html(signupMailTemplate(otp));

    const mailOptions = {
      from: "jerrytechs83@gmail.com",
      to: email,
      subject: "Signup Verification OTP",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {}
};
