import { NextFunction, Request, Response } from "express";
import { getCityFromQueryAsync } from "../services/city.service";

export const getCities = async (req:Request, res:Response, next:NextFunction) =>
{
    try
    {
        const {q} = req.query;
        const cities = await getCityFromQueryAsync(String(q));
        res.json(cities)
    }catch(e)
    {
        next(e);
    }
}