import { useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';
import { UserPosition } from '../services/model/UserPosition';

export const useGetAllUserPosition = (): UseQueryResult<UserPosition[]> =>
    useQuery(QUERIES.GET_ALL_USER_POSITION, async () =>
        GenericService.getAll(ENDPOINTS.USER_POSITION).then((res) => res.data)
    );
