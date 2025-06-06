import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.router";
import { clinicRouter } from "./routes/clinic.router";
import { doctorRouter } from "./routes/doctor.router";
import { serviceRouter } from "./routes/service.router";
import { setupSwagger } from "./swagger";

dotenv.config(); // Загружаем .env

const app = express();
app.use(express.json());

mongoose
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/clinic-api")
    .then(() => console.log("Database available!!!"))
    .catch((err) => console.error("Database connection error:", err));

app.use("/auth", authRouter);
app.use("/clinics", clinicRouter);
app.use("/doctors", doctorRouter);
app.use("/services", serviceRouter);

setupSwagger(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));