import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { Product } from '../services/model/Product';
import { QUERIES } from '../configs/constants';
import OrderService from '../services/OrderService';
import { OrderSaveRequest } from '../services/model/OrderSaveRequest';
import { OrderView } from '../services/model/OrderView';

export const useGetAllOrders = (): UseQueryResult<Product[]> =>
    useQuery(QUERIES.GET_ALL_ORDERS, async () => OrderService.getAll().then((res) => res.data));

export const useDeleteOrder = (): UseMutationResult<void, string, number> =>
    useMutation(QUERIES.DELETE_ORDER, (id: number) => OrderService.del(id));

export const useSaveOrder = (): UseMutationResult<OrderView[], string, OrderSaveRequest> =>
    useMutation(QUERIES.SAVE_ORDER, (request: OrderSaveRequest) => OrderService.save(request).then((res) => res.data));
