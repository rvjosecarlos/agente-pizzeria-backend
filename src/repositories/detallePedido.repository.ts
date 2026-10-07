import { CreateOrderDetailType } from "../dtos/detallePedido.dto.ts";
import { OrderDetailModel } from "../model/OrderDetail.model.ts";


export class OrderDetailRepository {
    
    static insertOrderDetail = async (dto: CreateOrderDetailType[]) => {
        console.log("Se inicia la intencio en la BD", { dto });
        const result = await OrderDetailModel.insertMany(dto);
        console.log({result});
        return result;
    };
};