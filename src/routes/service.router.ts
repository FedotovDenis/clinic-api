import { Router, Request, Response, NextFunction } from "express";
import { ServiceController } from "../controllers/service.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";
import { check } from "express-validator";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
};

const validateService = [
    check("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
];

router.post("/", authMiddleware, adminMiddleware, validateService, asyncHandler(ServiceController.create));
router.get("/", asyncHandler(ServiceController.getAll));
router.get("/:id", asyncHandler(ServiceController.getById));
router.put("/:id", authMiddleware, adminMiddleware, validateService, asyncHandler(ServiceController.update));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(ServiceController.delete));

export const serviceRouter = router;