import { Product } from './Product';

export interface OrderView {
    orderId: number | null;
    description: string | null;
    id: number | null;
    product: Product;
    quantity: number | null;
    orderType: string | null;
    startDate: string | null;
    endDate: string | null;
}
