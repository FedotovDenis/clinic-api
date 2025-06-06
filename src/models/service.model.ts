import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
    name: { type: String, required: true },
});

export const Service = mongoose.model("Service", serviceSchema);