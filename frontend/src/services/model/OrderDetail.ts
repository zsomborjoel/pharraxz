import { Product } from './Product';

export interface OrderDetail {
    orderDetailId: number | null;
    product: Product;
    quantity: number | null;
    orderType: string | null;
    startDate: string | null;
    endDate: string | null;
}
