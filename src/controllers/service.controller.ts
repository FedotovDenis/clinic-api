import { Request, Response } from "express";
import { Service } from "../models/service.model";
import { body, validationResult } from "express-validator";

export class ServiceController {
    static validateService = [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
        body("clinic").notEmpty().withMessage("Clinic ID is required"),
    ];

    async create(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const service = await Service.create(req.body);
            res.status(201).json({ message: "Service created", service });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { minPrice, maxPrice } = req.query;
            const query: any = {};
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) query.price.$gte = Number(minPrice);
                if (maxPrice) query.price.$lte = Number(maxPrice);
            }
            const services = await Service.find(query).populate("clinic");
            res.status(200).json(services);
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const service = await Service.findById(req.params.id).populate("clinic");
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json(service);
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
            const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json({ message: "Service updated", service });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const service = await Service.findByIdAndDelete(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json({ message: "Service deleted" });
        } catch (error: any) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export const serviceController = new ServiceController();