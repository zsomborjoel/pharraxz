import { useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';
import { Role } from '../services/model/Role';

export const useGetAllRole = (): UseQueryResult<Role[]> =>
    useQuery(QUERIES.GET_ALL_ROLE, async () => GenericService.getAll(ENDPOINTS.ROLE).then((res) => res.data));
