import { OrderDetail } from './OrderDetail';

export interface DoctorOrderOverview {
    orderId: number;
    description: string;
    orderDetail: OrderDetail;
}
