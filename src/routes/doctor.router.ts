import { Router, Request, Response, NextFunction } from "express";
import { DoctorController } from "../controllers/doctor.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";
import { check } from "express-validator";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
};

const validateDoctor = [
    check("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
    check("surname").notEmpty().withMessage("Surname is required").isString().withMessage("Surname must be a string"),
    check("phone").notEmpty().withMessage("Phone is required").isString().withMessage("Phone must be a string"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("specialty").notEmpty().withMessage("Specialty is required").isString().withMessage("Specialty must be a string"),
    check("clinics").isArray().withMessage("Clinics must be an array"),
    check("services").isArray().withMessage("Services must be an array"),
];

router.post("/", authMiddleware, adminMiddleware, validateDoctor, asyncHandler(DoctorController.create));
router.get("/", asyncHandler(DoctorController.getAll));
router.get("/:id", asyncHandler(DoctorController.getById));
router.put("/:id", authMiddleware, adminMiddleware, validateDoctor, asyncHandler(DoctorController.update));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(DoctorController.delete));

export const doctorRouter = router;