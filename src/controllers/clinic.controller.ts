import { Request, Response } from "express";
import { Clinic } from "../models/clinic.model";
import { body, validationResult } from "express-validator";

export class ClinicController {
    static validateClinic = [
        body("name").notEmpty().withMessage("Name is required"),
        body("address").notEmpty().withMessage("Address is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("rating").optional().isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
    ];

    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const clinic = await Clinic.create(req.body);
            res.status(201).json({ message: "Clinic created", clinic });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const clinics = await Clinic.find();
            res.status(200).json(clinics);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const clinic = await Clinic.findById(req.params.id);
            if (!clinic) {
                return res.status(404).json({ message: "Clinic not found" });
            }
            res.status(200).json(clinic);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!clinic) {
                return res.status(404).json({ message: "Clinic not found" });
            }
            res.status(200).json({ message: "Clinic updated", clinic });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const clinic = await Clinic.findByIdAndDelete(req.params.id);
            if (!clinic) {
                return res.status(404).json({ message: "Clinic not found" });
            }
            res.status(200).json({ message: "Clinic deleted" });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const clinicController = new ClinicController();