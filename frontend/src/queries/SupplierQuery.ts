import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import { Supplier } from '../services/model/Supplier';
import GenericService from '../services/GenericService';

export const useGetAllSupplier = (): UseQueryResult<Supplier[]> =>
    useQuery(QUERIES.GET_ALL_SUPPLIER, async () => GenericService.getAll(ENDPOINTS.SUPPLIER).then((res) => res.data));

export const useDeleteSupplier = (): UseMutationResult<void, string, number, unknown> =>
    useMutation(QUERIES.DELETE_SUPPLIER, (id: number) =>
        GenericService.del(ENDPOINTS.SUPPLIER, id).then((res) => res.data)
    );

export const useSaveSupplier = (): UseMutationResult<number, string, Supplier> =>
    useMutation(QUERIES.SAVE_SUPPLIER, (request: Supplier) =>
        GenericService.save<Supplier, number>(ENDPOINTS.SUPPLIER, request).then((res) => res.data)
    );
