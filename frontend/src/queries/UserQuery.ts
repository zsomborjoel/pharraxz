import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import { User } from '../services/model/User';
import GenericService from '../services/GenericService';

export const useGetAllUser = (): UseQueryResult<User[]> =>
    useQuery(QUERIES.GET_ALL_USER, async () => GenericService.getAll(ENDPOINTS.USER).then((res) => res.data));

export const useDeleteUser = (): UseMutationResult<void, string, number, unknown> =>
    useMutation(QUERIES.DELETE_USER, (id: number) => GenericService.del(ENDPOINTS.USER, id).then((res) => res.data));

export const useSaveUser = (): UseMutationResult<number, string, User> =>
    useMutation(QUERIES.SAVE_USER, (request: User) =>
        GenericService.save<User, number>(ENDPOINTS.USER, request).then((res) => res.data)
    );
