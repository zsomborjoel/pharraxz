import { OrderDetail } from './OrderDetail';

export interface OrderSaveRequest {
    orderId: number | null;
    userId: number | undefined;
    description: string | null;
    orderDetail: OrderDetail;
}
