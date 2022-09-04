import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { OrderView } from './model/OrderView';
import { OrderSaveRequest } from './model/OrderSaveRequest';
import { ENDPOINTS } from '../configs/constants';

const getAll = (): Promise<AxiosResponse<OrderView[]>> => axios.get(ENDPOINTS.ORDER, { headers: AuthHeader() });

const del = (id: number): Promise<void> => axios.delete(`${ENDPOINTS.ORDER}/detail/${id}`, { headers: AuthHeader() });

const save = (request: OrderSaveRequest): Promise<AxiosResponse<OrderView[]>> =>
    axios.post(ENDPOINTS.ORDER, request, { headers: AuthHeader() });

const OrderService = {
    getAll,
    del,
    save,
};

export default OrderService;
