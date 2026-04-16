"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/tg:
 *   post:
 *     summary: Telegram authentication
 *     description: Авторизация пользователя через Telegram initData
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               initData:
 *                 type: string
 *                 example: "query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=..."
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       400:
 *         description: Некорректные данные
 *       403:
 *         description: Невалидные данные Telegram
 *       500:
 *         description: Ошибка сервера
 */
router.post("/auth", auth_controller_1.auth);
router.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.me);
exports.default = router;
