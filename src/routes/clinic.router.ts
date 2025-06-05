import { Router, Request, Response, NextFunction } from "express";
import { clinicController, ClinicController } from "../controllers/clinic.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
};

router.post("/", authMiddleware, adminMiddleware, ClinicController.validateClinic, asyncHandler(clinicController.create));
router.get("/", asyncHandler(clinicController.getAll));
router.get("/:id", asyncHandler(clinicController.getById));
router.put("/:id", authMiddleware, adminMiddleware, ClinicController.validateClinic, asyncHandler(clinicController.update));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(clinicController.delete));

export const clinicRouter = router;