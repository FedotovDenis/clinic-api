import mongoose, { Schema } from "mongoose";

const clinicSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
});

export const Clinic = mongoose.model("Clinic", clinicSchema);