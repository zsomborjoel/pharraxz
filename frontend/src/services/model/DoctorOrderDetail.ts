import { Product } from './Product';

export interface DoctorOrderDetail {
    orderDetailId: number;
    product: Product;
    quantity: number;
    oderType: string;
    startDate: string;
    endDate: string;
}
