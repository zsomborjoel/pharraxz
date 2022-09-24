import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { Product } from '../services/model/Product';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';

export const useGetAllProduct = (): UseQueryResult<Product[]> =>
    useQuery(QUERIES.GET_ALL_PRODUCT, async () =>
        GenericService.getAll<Product>(ENDPOINTS.PRODUCT).then((res) => res.data)
    );

export const useDeleteProduct = (): UseMutationResult<void, string, number, unknown> =>
    useMutation(QUERIES.DELETE_PRODUCT, async (id: number) =>
        GenericService.del(ENDPOINTS.PRODUCT, id).then((res) => res.data)
    );

export const useSaveProduct = (): UseMutationResult<number, string, Product> =>
    useMutation(QUERIES.SAVE_PRODUCT, (request: Product) =>
        GenericService.save<Product, number>(ENDPOINTS.PRODUCT, request).then((res) => res.data)
    );
