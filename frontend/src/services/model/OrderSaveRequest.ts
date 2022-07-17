import { OrderDetail } from './OrderDetail';

export interface OrderSaveRequest {
    orderId: number;
    userId: number;
    description: string;
    orderDetail: OrderDetail;
}
