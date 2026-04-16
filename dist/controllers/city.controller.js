"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeCity = exports.GetCities = void 0;
const city_service_1 = require("../services/city.service");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const logger_1 = __importDefault(require("../utils/logger"));
const GetCities = async (req, res, next) => {
    try {
        const { q } = req.query;
        const cities = await (0, city_service_1.getCityFromQueryAsync)(String(q));
        res.json(cities);
    }
    catch (e) {
        next(e);
    }
};
exports.GetCities = GetCities;
const ChangeCity = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { q } = req.query;
        const cityNew = (0, city_service_1.getCityByName)(String(q));
        const result = await (0, city_service_1.UpdateUserCity)(String(userId), String((await cityNew).Name));
        if (!cityNew || !result) {
            throw new custom_exceptions_1.AppError("Could not find city");
        }
        return res.status(200).json({ message: "done" });
    }
    catch (e) {
        if (e instanceof custom_exceptions_1.AppError) {
            logger_1.default.error(`Could not change city`);
            return e;
        }
    }
};
exports.ChangeCity = ChangeCity;
