import { OrderDetail } from './OrderDetail';

export interface OrderOverview {
    orderId: number;
    description: string;
    orderDetails: OrderDetail[];
}
