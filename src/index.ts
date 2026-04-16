import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import interestsRouter from "./routes/interests.route"
import musicRouter from "./routes/music.route"
import profileRouter from "./routes/profile.route"
import promptRouter from "./routes/prompt.route"
import photoRouter from "./routes/photo.route"

import { authMiddleware } from "./middleware/auth.middleware";
import { swaggerSpec } from "./utils/swagger.extension";
import logger from "./utils/logger";
import { errorMiddleware } from "./middleware/exception.middleware";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors({
    origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
        : true
}));


app.use(express.json());
app.use(morgan(
    ':method :url :status :response-time ms',
    {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }
));


// --- Swagger ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// --- Routes ---
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});


app.get("/api/me", authMiddleware, (req, res) => {
    res.json({
        userId: (req as any).user?.userId
    });
});

// Static files (photos for profiles)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Endpoints
app.use(authRouter);
app.use("/api/music", authMiddleware, musicRouter);
app.use("/api/interests", authMiddleware, interestsRouter);
app.use("/api/users", authMiddleware, userRouter);
app.use("/api/profile", authMiddleware, profileRouter);
app.use("/api/prompt", authMiddleware, promptRouter);
app.use("/api/photos", authMiddleware, photoRouter);


// --- 404 ---
app.use("/api", (_req, res) => {
    res.status(404).json({ message: "Route not found" });
});


// --- Start ---
app.listen(PORT, () => {
    logger.info(`Server started on http://localhost:${PORT}`);
});


// ! Error middleware
app.use(errorMiddleware);