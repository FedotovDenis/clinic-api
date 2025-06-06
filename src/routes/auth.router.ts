import { Router } from "express";
import { authController, AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.validateRegister, authController.register);
router.post("/login", authController.login);
router.post("/reset-password", AuthController.validateReset, authController.resetPassword);

export const authRouter = router;