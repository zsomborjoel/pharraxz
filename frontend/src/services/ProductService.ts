import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { Product } from './model/Product';
import { ENDPOINTS } from '../configs/constants';

const getAllProducts = async (): Promise<AxiosResponse<Product[]>> =>
    axios.get(ENDPOINTS.PRODUCT, { headers: AuthHeader() });

const ProductService = {
    getAllProducts,
};

export default ProductService;
