import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized!" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret123");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token!" });
    }
};