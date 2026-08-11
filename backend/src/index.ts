import "dotenv/config";
import express from "express";
import cors from "cors";
import doctorsRouter from "./routes/doctors";
import authRouter from "./routes/auth";
import announcementsRouter from "./routes/announcements";
import medicalServicesRouter from "./routes/medical-services";
import clinicScheduleRouter from "./routes/clinic-schedule";
import newsRouter from "./routes/news";
import procurementRouter from "./routes/procurement";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/doctors", doctorsRouter);
app.use("/api/auth", authRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/medical-services", medicalServicesRouter);
app.use("/api/clinic-schedule", clinicScheduleRouter);
app.use("/api/news", newsRouter);
app.use("/api/procurement", procurementRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
