import { CreateOrderDetailType, OrderDetailType } from "../dtos/detallePedido.dto.ts";
import { OrderDetailModel } from "../model/OrderDetail.model.ts";


export class OrderDetailRepository {
    
    static insertOrderDetail = async (dto: CreateOrderDetailType[]) => {
        const result = await OrderDetailModel.insertMany(dto);
        return result;
    };

    static deleteOrderDetail = async (dto: OrderDetailType[]) => {
        const result =  await OrderDetailModel.deleteMany(dto);
    };
};