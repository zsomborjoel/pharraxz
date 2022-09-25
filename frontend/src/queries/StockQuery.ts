import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';
import { Stock } from '../services/model/Stock';

export const useGetAllStock = (): UseQueryResult<Stock[]> =>
    useQuery(QUERIES.GET_ALL_STOCK, async () => GenericService.getAll<Stock>(ENDPOINTS.STOCK).then((res) => res.data));

export const useDeleteStock = (): UseMutationResult<void, string, number, unknown> =>
    useMutation(QUERIES.DELETE_STOCK, async (id: number) =>
        GenericService.del(ENDPOINTS.STOCK, id).then((res) => res.data)
    );

export const useSaveStock = (): UseMutationResult<number, string, Stock> =>
    useMutation(QUERIES.SAVE_STOCK, (request: Stock) =>
        GenericService.save<Stock, number>(ENDPOINTS.STOCK, request).then((res) => res.data)
    );
