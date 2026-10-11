import { Request, Response, NextFunction } from "express";
import { ClienteService } from "../services/cliente.service.ts";
import { CreateClientType } from "../dtos/cliente.dto.ts";

export class ClienteController {
    static createClient = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as CreateClientType;
            const result = await ClienteService.addClient(dto);
            res.status(200).json({
                success:true,
                message: "Cliente creado",
                errors: [],
                data: result
            });
        }
        catch(error){
            next(error)
        };
    };  

    static getClients = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const result = await ClienteService.getClients();
            res.status(200).json({
                success: true,
                message: "Clientes obtenidos",
                errors: [],
                data: result
            });
        }
        catch(error){
            next(error)
        };
    };
};