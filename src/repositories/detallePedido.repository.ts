import { CreateOrderDetailType } from "../dtos/detallePedido.dto.ts";
import { OrderDetailModel } from "../model/OrderDetail.model.ts";


export class OrderDetailRepository {
    
    static insertOrderDetail = async (dto: CreateOrderDetailType[]) => {
        const result = await OrderDetailModel.insertMany(dto);
        return result;
    };
};