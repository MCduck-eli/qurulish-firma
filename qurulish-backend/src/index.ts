import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./config/db";
import blogRoutes from "./routes/blog-route";
import authRoutes from "./routes/auth-routes";
import fs from "fs";

const app = express();
const PORT = 5001;
connectDB();
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        console.error("Server xatosi:", err.message);
        res.status(500).json({ success: false, message: err.message });
    },
);

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `Server barcha tarmoq interfeyslarida ishlayapti: http://192.168.1.40:${PORT}`,
    );
});
