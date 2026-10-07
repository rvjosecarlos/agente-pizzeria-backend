import { CreateItemType, GetItemType, ItemType } from "../dtos/item.dto.ts";
import { ItemRepository } from "../repositories/item.repository.ts";
import { ItemSchema } from "../types/index.ts";

export class ItemService {
    static addItem = async (dto: CreateItemType) => {
        const res = await ItemRepository.insertItem(dto);
        const { success, data, error } = ItemSchema.safeParse(res);
        if( !success ){
            throw new Error(`Error al validar la salida de la inserción a la BD en ITEM_SERVICE: ${error.message}`)
        };
        return data;
    };

    static getItems = async () => {
        const res = await ItemRepository.findItems();
        const { success, data, error } = ItemSchema.array().safeParse(res);
        if( !success ){
            throw new Error(`Error al validar la salida de la consulta de items ITEM_SERVICE: ${error.message}`)
        };
        return data;
    };

    static getItem = async (dto: GetItemType) => {
        const res = await ItemRepository.findItemById(dto);
        const { success, data, error } = ItemSchema.safeParse(res);
        if(!success){
            throw new Error(`Error al validar la salida de la consulta de un solo Item ITEM_SERVICE ${error.message}`);
        };
        return data;
    };

    static modificarItem = async (dto: ItemType) => {
        const res = await ItemRepository.updateItemById(dto);
        const { success, data, error } = ItemSchema.safeParse(res);
        if(!success){
            throw new Error(`Error al validar la salida del registro actualizado ITEM_SERVICE: ${error.message}`);
        };
        return data;
    };

    static eliminarItem = async (id: ItemType["id"]) => {
        await ItemRepository.deleteItemById(id);
    };
};