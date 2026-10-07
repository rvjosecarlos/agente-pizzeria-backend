import { CreateItemType, GetItemType, ItemType } from "../dtos/item.dto.ts";
import { ItemModel } from "../model/Item.mode.ts";

export class ItemRepository {
    static insertItem = async (dto: CreateItemType) => {
        const result = await ItemModel.insertOne(dto);
        return result;
    };

    static findItems = async () => {
        const result =  await ItemModel.find();
        return result;
    };

    static findItemById = async (dto: GetItemType) => {
        const result = await ItemModel.findById(dto.id);
        return result;
    };

    static updateItemById = async (dto: ItemType) => {
        const { id, name, size, precio } = dto;
        const result = await ItemModel.findById(id);
        if( !result ){
            throw new Error(`No se encontraron registros del item: ${ id }`);
        };
        result.name = name;
        result.size = size;
        result.precio = precio;
        await result.save();
        return result;
    };

    static deleteItemById = async (id: ItemType["id"]) => {
        const result = await ItemModel.findByIdAndDelete(id);
    };
};