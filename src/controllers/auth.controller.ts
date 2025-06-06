import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";

export class AuthController {
    static validateRegister = [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ];

    static validateReset = [
        body("email").isEmail().withMessage("Invalid email"),
    ];

    async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword, role: "user" });
            res.status(201).json({ message: "User registered", user });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET || "mysecret123",
                { expiresIn: "1h" }
            );
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const resetToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || "mysecret123",
                { expiresIn: "15m" }
            );
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Password Reset",
                text: `Click to reset your password: http://localhost:7000/auth/reset/${resetToken}`,
            });
            res.status(200).json({ message: "Reset email sent" });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const authController = new AuthController();