import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { Product } from './model/Product';
import { ENDPOINTS } from '../configs/constants';

const getAll = (): Promise<AxiosResponse<Product[]>> => axios.get(ENDPOINTS.PRODUCT, { headers: AuthHeader() });

const del = async (id: string): Promise<AxiosResponse<void>> =>
    axios.delete(`${ENDPOINTS.PRODUCT}/${id}`, { headers: AuthHeader() });

const save = async (request: Product): Promise<AxiosResponse<Product>> =>
    axios.post(ENDPOINTS.PRODUCT, request, { headers: AuthHeader() });

const ProductService = {
    getAll,
    del,
    save,
};

export default ProductService;
