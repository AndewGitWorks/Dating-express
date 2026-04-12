import { Request, Response } from "express";
import { NotFoundError } from "../exceptions/custom.exceptions";
import { GetUserByIdAsync } from "../services/user.service";



export const GetUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await GetUserByIdAsync(id);

        return res.status(200).json(user);
    } catch (err) {
        if (err instanceof NotFoundError) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};
