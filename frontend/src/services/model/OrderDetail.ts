import { Product } from './Product';

export interface OrderDetail {
    orderDetailId: number;
    product: Product;
    quantity: number;
    oderType: string | null;
    startDate: string;
    endDate: string;
}
