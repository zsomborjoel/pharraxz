import { Product } from './Product';

export interface OrderView {
    orderId: number;
    description: string;
    id: number | null;
    product: Product;
    quantity: number | null;
    oderType: string | null;
    startDate: string | null;
    endDate: string | null;
}
