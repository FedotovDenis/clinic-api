import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    specialty: { type: String, required: true },
    clinics: [{ type: Schema.Types.ObjectId, ref: "Clinic" }],
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
});

export const Doctor = mongoose.model("Doctor", doctorSchema);