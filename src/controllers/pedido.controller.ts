import { Request, Response, NextFunction } from "express";
import { CreatePedidoType } from "../dtos/pedido.dto.ts";
import { PedidoService } from "../services/pedido.service.ts";

export class PedidoController {
    static crearPedido = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as CreatePedidoType;
            console.log("DATOS DE ENTRADA",{dto});
            const result = await PedidoService.agregarPedido(dto);
            res.status(200).json({
                success: true,
                message: "",
                errors: [],
                data: result
            });
        }
        catch(error){
            next(error);
        };
    };
};