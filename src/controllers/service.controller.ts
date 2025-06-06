import { Request, Response } from "express";
import { Service } from "../models/service.model";
import { Doctor } from "../models/doctor.model";
import { validationResult } from "express-validator";

export class ServiceController {
    static async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const service = new Service(req.body);
            await service.save();
            res.status(201).json({ message: "Service created", service });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const { name, sortByName } = req.query;
            const query: any = {};
            if (name) query.name = { $regex: name, $options: "i" };
            const sort: any = sortByName ? { name: sortByName === "asc" ? 1 : -1 } : {};
            const services = await Service.find(query).sort(sort);
            res.status(200).json(services);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const service = await Service.findById(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json(service);
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
            const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json({ message: "Service updated", service });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const service = await Service.findByIdAndDelete(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            await Doctor.updateMany({}, { $pull: { services: service._id } });
            res.status(200).json({ message: "Service deleted" });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const serviceController = new ServiceController();