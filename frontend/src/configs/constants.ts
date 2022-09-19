import { SERVER_URL } from './env';

export const URL_PATHS = {
    REFRESH_TOKEN_PATH: '/auth/refreshtoken',
    LOGIN_PATH: '/auth/login',
};

export const ENDPOINTS = {
    BASE: SERVER_URL,
    REFRESH_TOKEN: SERVER_URL + URL_PATHS.REFRESH_TOKEN_PATH,
    LOGIN: SERVER_URL + URL_PATHS.LOGIN_PATH,
    ORDER: `${SERVER_URL}/orders`,
    USER: `${SERVER_URL}/users`,
    PRODUCT: `${SERVER_URL}/products`,
    SUPPLIER: `${SERVER_URL}/suppliers`,
};

export const ROUTES = {
    ROOT: '/',
    HOME: '/home',
    ORDER: '/order',
    PRODUCT: '/product',
    SUPPLIER: '/supplier',
};

export const QUERIES = {
    GET_ALL_PRODUCT: 'getAllProduct',
    DELETE_PRODUCT: 'deleteProduct',
    SAVE_PRODUCT: 'saveProduct',
    GET_ALL_ORDER: 'getAllOrder',
    DELETE_ORDER: 'deleteOrder',
    SAVE_ORDER: 'saveOrder',
    GET_ALL_SUPPLIER: 'getAllSupplier',
    DELETE_SUPPLIER: 'deleteSupplier',
    SAVE_SUPPLIER: 'saveSupplier',
};

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
