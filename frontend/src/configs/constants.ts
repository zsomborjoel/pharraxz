import { SERVER_URL } from './env';

export const ENDPOINTS = {
    BASE: SERVER_URL,
    REFRESH_TOKEN: `${SERVER_URL}/auth/refreshtoken`,
    LOGIN: `${SERVER_URL}/auth/login`,
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
    GET_ALL_PRODUCTS: 'getAllProducts',
    DELETE_PRODUCT: 'deleteProduct',
    GET_ALL_ORDERS: 'getAllOrders',
    DELETE_ORDER: 'deleteOrder',
    SAVE_ORDER: 'saveOrder',
};

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
