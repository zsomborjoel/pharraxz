import { OrderType } from '../enum/OrderType';
import { Product } from './Product';

export interface OrderDetail {
    orderDetailId: number | null;
    product: Product;
    quantity: number | null;
    orderType: OrderType | string;
    startDate: string | null;
    endDate: string | null;
}
