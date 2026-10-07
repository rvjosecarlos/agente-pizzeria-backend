import { Request, Response, NextFunction } from "express";
import { ClienteService } from "../services/cliente.service.ts";
import { success } from "zod";

export class ClienteController {
    static createClient = async (req: Request, res: Response, next: NextFunction) => {
        const result = await ClienteService.addClient({});
        res.status(200).json({
            success:true,
            message: "Cliente creado",
            errors: [],
            data: null
        });
    };  
};