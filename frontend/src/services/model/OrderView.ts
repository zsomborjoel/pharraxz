import { OrderType } from '../enum/OrderType';
import { Product } from './Product';

export interface OrderView {
    orderId: number;
    description: string;
    id: number;
    product: Product;
    quantity: number;
    orderType: OrderType;
    startDate: Date;
    endDate: Date;
}
