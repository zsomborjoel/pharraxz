import { OrderType } from '../enum/OrderType';
import { Product } from './Product';

export interface OrderView {
    orderId: number | null;
    description: string | null;
    id: number | null;
    product: Product;
    quantity: number | null;
    orderType: OrderType | string;
    startDate: string | null;
    endDate: string | null;
}
