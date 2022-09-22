import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import { Supplier } from '../services/model/Supplier';
import GenericService from '../services/GenericService';

export const useGetAllSupplier = (): UseQueryResult<Supplier[]> =>
    useQuery(QUERIES.GET_ALL_SUPPLIER, async () => GenericService.getAll(ENDPOINTS.SUPPLIER).then((res) => res.data));

export const useDeleteSupplier = (): UseMutationResult<void, string, string, unknown> =>
    useMutation(QUERIES.DELETE_SUPPLIER, (id: string) =>
        GenericService.del(ENDPOINTS.SUPPLIER, id).then((res) => res.data)
    );

export const useSaveSupplier = (): UseMutationResult<string, string, Supplier> =>
    useMutation(QUERIES.SAVE_SUPPLIER, (request: Supplier) =>
        GenericService.save<Supplier, string>(ENDPOINTS.SUPPLIER, request).then((res) => res.data)
    );
