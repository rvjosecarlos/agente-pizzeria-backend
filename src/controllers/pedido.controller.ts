import { Request, Response, NextFunction } from "express";
import { CreatePedidoType, EstadosPedidoType, OrderType } from "../dtos/pedido.dto.ts";
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

    static getPedidos = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as EstadosPedidoType;
            const result = await PedidoService.obtenerPedidos(dto);
            res.status(200).json({
                success: true,
                message: "Pedido obtenidos",
                errors: [],
                data: result
            });
        }
        catch(error){
            next(error);
        };
    };

    static updatePedido = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as OrderType;
            const result = await PedidoService.actualizarPedido(dto);
            res.status(200).json({
                success: true,
                message: "Pedido actualizdo",
                errors:[],
                data: result
            });
        }
        catch(error){
            next(error);
        };
    };
};