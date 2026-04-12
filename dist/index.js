"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const interests_route_1 = __importDefault(require("./routes/interests.route"));
const music_route_1 = __importDefault(require("./routes/music.route"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const swagger_extension_1 = require("./utils/swagger.extension");
const logger_1 = __importDefault(require("./utils/logger"));
const exception_middleware_1 = require("./middleware/exception.middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// --- Middlewares ---
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
        : true
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)(':method :url :status :response-time ms', {
    stream: {
        write: (message) => logger_1.default.info(message.trim())
    }
}));
// --- Swagger ---
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_extension_1.swaggerSpec));
// --- Routes ---
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.get("/api/me", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({
        userId: req.user?.userId
    });
});
// Endpoints
app.use(music_route_1.default);
app.use(auth_route_1.default);
app.use(interests_route_1.default);
app.use("/api/users", user_route_1.default);
// --- 404 ---
app.use("/api", (_req, res) => {
    res.status(404).json({ message: "Route not found" });
});
// --- Start ---
app.listen(PORT, () => {
    logger_1.default.info(`Server started on http://localhost:${PORT}`);
});
// ! Error middleware
app.use(exception_middleware_1.errorMiddleware);
