import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.router";
import { clinicRouter } from "./routes/clinic.router";
import { doctorRouter } from "./routes/doctor.router";
import { serviceRouter } from "./routes/service.router";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/clinics", clinicRouter);
app.use("/doctors", doctorRouter);
app.use("/services", serviceRouter);

const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env");
    process.exit(1);
}

mongoose.connect(MONGO_URI).then(() => {
    console.log("Database available!!!");
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
});