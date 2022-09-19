import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import OrderService from '../services/OrderService';
import { OrderSaveRequest } from '../services/model/OrderSaveRequest';
import { OrderView } from '../services/model/OrderView';
import GenericService from '../services/GenericService';

export const useGetAllOrder = (): UseQueryResult<OrderView[]> =>
    useQuery(QUERIES.GET_ALL_ORDER, async () => GenericService.getAll(ENDPOINTS.ORDER).then((res) => res.data));

export const useDeleteOrder = (): UseMutationResult<void, string, number> =>
    useMutation(QUERIES.DELETE_ORDER, (id: number) => GenericService.del(ENDPOINTS.ORDER, id).then((res) => res.data));

export const useSaveOrder = (): UseMutationResult<OrderView[], string, OrderSaveRequest> =>
    useMutation(QUERIES.SAVE_ORDER, (request: OrderSaveRequest) => OrderService.save(request).then((res) => res.data));
