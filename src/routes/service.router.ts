import { Router, Request, Response, NextFunction } from "express";
import { serviceController, ServiceController } from "../controllers/service.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
};

router.post("/", authMiddleware, adminMiddleware, ServiceController.validateService, asyncHandler(serviceController.create));
router.get("/", asyncHandler(serviceController.getAll));
router.get("/:id", asyncHandler(serviceController.getById));
router.put("/:id", authMiddleware, adminMiddleware, ServiceController.validateService, asyncHandler(serviceController.update));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(serviceController.delete));

export const serviceRouter = router;