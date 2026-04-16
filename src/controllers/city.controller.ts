import { NextFunction, Request, Response } from "express";
import { getCityByName, getCityFromQueryAsync, UpdateUserCity } from "../services/city.service";
import { AppError } from "../exceptions/custom.exceptions";
import logger from "../utils/logger";


export const GetCities = async (req:Request, res:Response, next:NextFunction) =>
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


export const ChangeCity = async (req:Request, res: Response) =>
{
    try{
        const userId = (req as any).user?.id;
        const {q} = req.query;
        const cityNew = getCityByName(String(q));
        const result = await UpdateUserCity(String(userId), String((await cityNew).Name));
        if(!cityNew || !result)
        {
            throw new AppError("Could not find city");
        }
        return res.status(200).json({message: "done"});
    }catch(e)
    {
        if(e instanceof AppError)
        {
            logger.error(`Could not change city`,);
            return e;
        }
    }
}