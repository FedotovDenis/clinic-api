import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400);
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword, role: "user" });
            res.status(201).json({ message: "User registered successfully!", userId: user._id });
        } catch (error: any) {
            res.status(500).json({ message: "Server error!", error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !await bcrypt.compare(password, user.password)) {
                res.status(401);
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "mysecret123", { expiresIn: "1h" });
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(500).json({ message: "Server error!", error: error.message });
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404);
                throw new Error("User not found!");
            }
            console.log(`Password reset requested for user: ${email}`);
            res.status(200).json({ message: "Password reset link sent successfully!" });
        } catch (error: any) {
            res.status(500).json({ message: "Server error!", error: error.message });
        }
    }
}

export const authController = new AuthController();