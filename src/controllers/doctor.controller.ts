import { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";
import { body, validationResult } from "express-validator";

export class DoctorController {
    static validateDoctor = [
        body("name").notEmpty().withMessage("Name is required"),
        body("specialty").notEmpty().withMessage("Specialty is required"),
        body("clinic").notEmpty().withMessage("Clinic ID is required"),
    ];

    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const doctor = await Doctor.create(req.body);
            res.status(201).json({ message: "Doctor created", doctor });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { specialty } = req.query;
            const query: any = {};
            if (specialty) query.specialty = specialty;
            const doctors = await Doctor.find(query).populate("clinic");
            res.status(200).json(doctors);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const doctor = await Doctor.findById(req.params.id).populate("clinic");
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json(doctor);
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
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json({ message: "Doctor updated", doctor });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const doctor = await Doctor.findByIdAndDelete(req.params.id);
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json({ message: "Doctor deleted" });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const doctorController = new DoctorController();