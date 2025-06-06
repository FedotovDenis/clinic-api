import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    clinic: { type: Schema.Types.ObjectId, ref: "Clinic", required: true },
});

export const Doctor = mongoose.model("Doctor", doctorSchema);