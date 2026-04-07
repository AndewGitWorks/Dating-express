import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRouter from "./Routes/user.route";
import checkTelegramAuth from "./Bot/validation";
import authRouter from "./Routes/auth.route";
import { authMiddleware } from "./middleware/auth.middleware";
import { swaggerSpec } from "./utils/swagger.extension";

const app = express();

const PORT = process.env.PORT || 3000;
const origin = process.env.CORS_ORIGIN;

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS middleware
app.use(cors({
    origin: origin ? origin.split(",").map((item) => item.trim()) : true
}));

// JSON parser middleware
app.use(express.json());

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

// Get current user info
app.get("/api/me", authMiddleware, (req: Request, res: Response) => {
    res.json({
        userId: (req as any).user?.userId
    });
});

// Telegram authentication
app.post("/api/auth/tg", (req: Request, res: Response) => {
    const { initData } = req.body;

    const isValid = checkTelegramAuth(initData, process.env.BOT_TOKEN!);

    if (!isValid) {
        return res.status(403).json({ message: "Invalid data" });
    }

    const params = new URLSearchParams(initData);
    const user = JSON.parse(params.get("user") || "{}");

    res.json({ user });
});

// Auth routes
app.use("/api/auth", authRouter);

// User routes
app.use("/api/users", userRouter);

// 404 handler - should be last
app.use("/api", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Маршрут не найден" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running! Address: http://localhost:${PORT}`);
    console.log(`Swagger docs available at: http://localhost:${PORT}/api-docs`);
});