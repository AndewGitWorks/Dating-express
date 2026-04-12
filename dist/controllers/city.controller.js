"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCities = void 0;
const city_service_1 = require("../services/city.service");
const getCities = async (req, res, next) => {
    try {
        const { q } = req.query;
        const cities = await (0, city_service_1.getCityFromQueryAsync)(String(q));
        res.json(cities);
    }
    catch (e) {
        next(e);
    }
};
exports.getCities = getCities;
