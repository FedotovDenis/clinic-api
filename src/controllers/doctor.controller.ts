import { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";
import { Clinic } from "../models/clinic.model";
import { validationResult } from "express-validator";

export class DoctorController {
    static async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const doctor = new Doctor(req.body);
            await doctor.save();


            console.log("Clinics in request:", req.body.clinics);


            if (req.body.clinics && req.body.clinics.length > 0) {
                const updateResult = await Clinic.updateMany(
                    { _id: { $in: req.body.clinics } },
                    { $addToSet: { doctors: doctor._id } }
                );
                console.log("Update result:", updateResult); // Отладка
            } else {
                console.log("No clinics provided");
            }

            res.status(201).json({ message: "Doctor created", doctor });
        } catch (error: any) {
            console.error("Error creating doctor:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const { name, surname, phone, email, specialty, sortByName } = req.query;
            const query: any = {};
            if (name) query.name = { $regex: name, $options: "i" };
            if (surname) query.surname = { $regex: surname, $options: "i" };
            if (phone) query.phone = { $regex: phone, $options: "i" };
            if (email) query.email = { $regex: email, $options: "i" };
            if (specialty) query.specialty = { $regex: specialty, $options: "i" };
            const sort: any = sortByName ? { name: sortByName === "asc" ? 1 : -1 } : {};
            const doctors = await Doctor.find(query).populate("services").sort(sort);
            res.status(200).json(doctors);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const doctor = await Doctor.findById(req.params.id).populate("services");
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json(doctor);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            if (req.body.clinics && req.body.clinics.length > 0) {
                await Clinic.updateMany(
                    { _id: { $in: req.body.clinics } },
                    { $addToSet: { doctors: doctor._id } }
                );
            }
            res.status(200).json({ message: "Doctor updated", doctor });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const doctor = await Doctor.findByIdAndDelete(req.params.id);
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            await Clinic.updateMany({}, { $pull: { doctors: doctor._id } });
            res.status(200).json({ message: "Doctor deleted" });
        } catch (error: any) {
            console.error("Error deleting doctor:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const doctorController = new DoctorController();