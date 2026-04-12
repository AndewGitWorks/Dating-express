import { Router } from "express";
import { auth, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

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
router.post("/auth", auth);
router.get("/api/me", authMiddleware, me);
export default router;