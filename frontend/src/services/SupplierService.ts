import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { ENDPOINTS } from '../configs/constants';
import { Supplier } from './model/Supplier';

const getAll = async (): Promise<AxiosResponse<Supplier[]>> => axios.get(ENDPOINTS.SUPPLIER, { headers: AuthHeader() });

const del = async (id: string): Promise<AxiosResponse<void>> =>
    axios.delete(`${ENDPOINTS.SUPPLIER}/${id}`, { headers: AuthHeader() });

const save = async (request: Supplier): Promise<AxiosResponse<Supplier>> =>
    axios.post(ENDPOINTS.SUPPLIER, request, { headers: AuthHeader() });

const SupplierService = {
    getAll,
    del,
    save,
};

export default SupplierService;
