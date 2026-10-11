import { CreateOrdenType, CreatePedidoType, OrderType } from "../dtos/pedido.dto.ts";
import { ClienteRepository } from "../repositories/cliente.repository.ts";
import { PedidoRepository } from "../repositories/pedido.repository.ts";
import { DetailPedidoSchema, GetPedidosSchema, ItemSchema, PedidoSchema } from "../types/index.ts";
import { OrderDetailService } from "./detallePedido.service.ts";
import { ItemRepository } from "../repositories/item.repository.ts";

export class PedidoService {
    static agregarPedido = async (dto: CreatePedidoType) => {

        const resultOrderDetail = await OrderDetailService.crearDetalleOrden(dto.orderDetailIds);
        const { success: successDetail, error: errorDetail, data: dataDetail } = DetailPedidoSchema.array().safeParse(resultOrderDetail);
        if( !successDetail ){
            throw new Error(`Error al validar la salida al crear el detalle del pedido - PEDIDO_SERVICE ${errorDetail.message}`);
        };
        const orderDetailIds = dataDetail.map( orderDetail => orderDetail.id);
        const result = await PedidoRepository.insertPedido({
            clientId: dto.clientId,
            total: dto.total,
            orderDetailIds: orderDetailIds,
            origen: dto.origen
        });
        const { success, data, error  } = PedidoSchema.safeParse(result);
        if( !success ){
            throw new Error(`Error al validar la salida al crear el pedido - ORDER_SERVICE ${error.message}`);
        };
        return data;
    };

    static agregarOrdenAsistente = async (dto: CreateOrdenType) => {
        const { numClient, orderDetailIds, nombreCliente, idConversation } = dto;
        let cliente = await ClienteRepository.findClient({ numClient: numClient });
        if( !cliente ){
            cliente = await ClienteRepository.insertClient({ 
                name: nombreCliente,
                phone: numClient,
                idConversation: idConversation
            });
        };
        const formatItems = orderDetailIds.map( itemOrder => ({ codigo: itemOrder.codigo, cantidad: itemOrder.cantidad }));
        const items = await ItemRepository.findItemsByCodigo(formatItems);
        const { success: successItems, data: dataItems, error: errorItems } = ItemSchema.array().safeParse(items);
        if( !successItems ){
            throw new Error(`Error al validar la salida de la consulta de items ITEM_SERVICE: ${errorItems.message}`)
        };
        let total = 0;
        const newOrderItems = formatItems.map( formatItem => {
            console.log("elemento del formatItems",{ formatItem });
            const itemBD = dataItems.find( item => item.codigo === formatItem.codigo);
            console.log("Se encuentra el elemento", { itemBD });
            if(itemBD) {
                total += itemBD.precio;
                return {
                    cantidad: formatItem.cantidad,
                    itemId: itemBD.id
                }
            };
            return { cantidad: 0, itemId: "" }
        });
        if( newOrderItems.length <= 0 ) throw new Error("No se armo el arreglo de nuevos items");
        const newOrder = {
            clientId: cliente.id,
            total: total,
            origen: "whatsapp",
            orderDetailIds: newOrderItems
        };
        const result = await this.agregarPedido(newOrder);
        return result;
    };

    static obtenerPedidos = async () => {
        const results = await PedidoRepository.findOrders();
        const { success, data, error } = GetPedidosSchema.array().safeParse(results);
        if( !success ){
            console.log(error.message);
            throw new Error(`Error al validar la salida de obtener pedido - ORDER_SERVICE ${error.message}`);
        };
        return data;
    };

    static actualizarPedido = async (dto: OrderType) => {
        const result = await PedidoRepository.updatePedido(dto);
        const { success, data, error } = PedidoSchema.safeParse(result);
        if( !success ){
            throw new Error(`Error al validar la salida de actualizar pedido - ORDER_SERVICE: ${error.message}`);
        };
        return data;
    };
};