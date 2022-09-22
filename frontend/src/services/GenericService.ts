import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';

const getAll = async <T>(endpoint: string): Promise<AxiosResponse<T[]>> =>
    axios.get(endpoint, { headers: AuthHeader() });

const del = async (endpoint: string, id: string | number): Promise<AxiosResponse<void>> =>
    axios.delete(`${endpoint}/${id}`, { headers: AuthHeader() });

const save = async <T, U>(endpoint: string, request: T): Promise<AxiosResponse<U>> =>
    axios.post(endpoint, request, { headers: AuthHeader() });

const GenericService = {
    getAll,
    del,
    save,
};

export default GenericService;
