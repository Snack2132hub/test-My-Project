import "dotenv/config";
import express from "express";
import cors from "cors";
import doctorsRouter from "./routes/doctors";
import authRouter from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/doctors", doctorsRouter);
app.use("/api/auth", authRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
