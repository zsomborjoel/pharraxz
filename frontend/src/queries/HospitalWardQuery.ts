import { useQuery, UseQueryResult } from 'react-query';
import { ENDPOINTS, QUERIES } from '../configs/constants';
import GenericService from '../services/GenericService';
import { HospitalWard } from '../services/model/HospitalWard';

export const useGetAllHospitalWard = (): UseQueryResult<HospitalWard[]> =>
    useQuery(QUERIES.GET_ALL_HOSPITAL_WARD, async () =>
        GenericService.getAll(ENDPOINTS.HOSPITAL_WARD).then((res) => res.data)
    );
