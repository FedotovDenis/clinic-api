import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    clinic: { type: Schema.Types.ObjectId, ref: "Clinic", required: true },
});

export const Service = mongoose.model("Service", serviceSchema);