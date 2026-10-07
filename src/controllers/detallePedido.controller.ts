import { Request, Response, NextFunction } from "express";
import { OrderDetailService } from "../services/detallePedido.service.ts";


export class OrderDetailController {
    static updateOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try{

        }
        catch(error){
            next(error);
        };
    };

    static deleteOrderDetail = async (req: Request, res: Response, next: NextFunction) => {
        try{

        }
        catch(error){
            next(error);
        };
    };
};