import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { Product } from '../services/model/Product';
import { QUERIES } from '../configs/constants';
import ProductService from '../services/ProductService';

export const useGetAllProducts = (): UseQueryResult<Product[]> =>
    useQuery(QUERIES.GET_ALL_PRODUCTS, async () => ProductService.getAll().then((res) => res.data));

export const useDeleteProduct = (): UseMutationResult<void, unknown, string, unknown> =>
    useMutation(QUERIES.DELETE_PRODUCT, (id: string) => ProductService.del(id).then((res) => res.data));
