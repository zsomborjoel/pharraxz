import { useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';
import { ReleaseAbleCode } from '../services/model/ReleaseAbleCode';

export const useGetAllReleaseAbleCode = (): UseQueryResult<ReleaseAbleCode[]> =>
    useQuery(QUERIES.GET_ALL_RELEASEABLECODE, async () =>
        GenericService.getAll(ENDPOINTS.RELEASEABLECODE).then((res) => res.data)
    );
