import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { Product } from '../services/model/Product';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';

export const useGetAllProduct = (): UseQueryResult<Product[]> =>
    useQuery(QUERIES.GET_ALL_PRODUCT, async () =>
        GenericService.getAll<Product>(ENDPOINTS.PRODUCT).then((res) =>
            res.data.map((product) => ({ ...product, id: product.name }))
        )
    );

export const useDeleteProduct = (): UseMutationResult<void, string, string, unknown> =>
    useMutation(QUERIES.DELETE_PRODUCT, async (id: string) =>
        GenericService.del(ENDPOINTS.PRODUCT, id).then((res) => res.data)
    );

export const useSaveProduct = (): UseMutationResult<string, string, Product> =>
    useMutation(QUERIES.SAVE_PRODUCT, (request: Product) =>
        GenericService.save<Product, string>(ENDPOINTS.PRODUCT, request).then((res) => res.data)
    );
