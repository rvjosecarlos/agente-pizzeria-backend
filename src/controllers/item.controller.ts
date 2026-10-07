import { Request, Response, NextFunction } from "express";
import { CreateClientType } from "../dtos/cliente.dto.ts";
import { ItemService } from "../services/item.service.ts";
import { GetItemType, ItemType } from "../dtos/item.dto.ts";

export class ItemController {
    static createItem = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as CreateClientType;
            const result = await ItemService.addItem(dto);
            res.status(200).json({
                success: true,
                message: "Item agregado",
                errors: [],
                data: result
            });
        }
        catch(error){
            next(error);
        }
    };

    static getItems = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const result = await ItemService.getItems();
            res.status(200).json({
                success: true,
                message: "Items obtenidos",
                errors: [],
                data: result
            });
        }
        catch(error){
            next(error);
        };
    };

    static getItem = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as GetItemType;
            const result = await ItemService.getItem(dto);
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

    static updateItem = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as ItemType;
            const result = await ItemService.modificarItem(dto);
            res.status(200).json({
                success: true,
                message: "Item actualizado",
                errors: [],
                data: result
            });
        }
        catch(error){
            console.log("ERROR");
            next(error);
        };
    };

    static deleteItem = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const dto = req.validateRequestData as { id: ItemType["id"] };
            await ItemService.eliminarItem(dto.id);
            res.status(200).json({
                success: true,
                message: "Item eliminado",
                errors: [],
                data: null
            });
        }
        catch(error){
            next(error);
        };
    };
};