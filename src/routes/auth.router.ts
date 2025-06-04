import { Router, Request, Response, NextFunction } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));

export const authRouter = router;