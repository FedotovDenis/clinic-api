import { Router, Request, Response, NextFunction } from "express";
import { doctorController, DoctorController } from "../controllers/doctor.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
};

router.post("/", authMiddleware, adminMiddleware, DoctorController.validateDoctor, asyncHandler(doctorController.create));
router.get("/", asyncHandler(doctorController.getAll));
router.get("/:id", asyncHandler(doctorController.getById));
router.put("/:id", authMiddleware, adminMiddleware, DoctorController.validateDoctor, asyncHandler(doctorController.update));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(doctorController.delete));

export const doctorRouter = router;