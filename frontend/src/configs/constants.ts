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
    ORDER_USER: `${SERVER_URL}/orders/user`,
    ORDER_DETAIL: `${SERVER_URL}/orders/detail`,
    USER: `${SERVER_URL}/users`,
    PRODUCT: `${SERVER_URL}/products`,
    SUPPLIER: `${SERVER_URL}/suppliers`,
    RELEASEABLECODE: `${SERVER_URL}/release-able-codes`,
    HOSPITAL_WARD: `${SERVER_URL}/hospital-wards`,
    STOCK: `${SERVER_URL}/stock`,
    USER_POSITION: `${SERVER_URL}/user-positions`,
    ROLE: `${SERVER_URL}/roles`,
    FILE: `${SERVER_URL}/files`,
};

export const ROUTES = {
    ROOT: '/',
    HOME: '/home',
    ORDER: '/order',
    PRODUCT: '/product',
    SUPPLIER: '/supplier',
    STOCK: '/stock',
    USER: '/user',
    FILE: '/file',
};

export const QUERIES = {
    GET_ALL_PRODUCT: 'getAllProduct',
    DELETE_PRODUCT: 'deleteProduct',
    SAVE_PRODUCT: 'saveProduct',
    GET_ALL_ORDER: 'getAllOrder',
    GET_ALL_ORDER_BY_USERID: 'getAllOrderByUserId',
    DELETE_ORDER: 'deleteOrder',
    SAVE_ORDER: 'saveOrder',
    GET_ALL_SUPPLIER: 'getAllSupplier',
    DELETE_SUPPLIER: 'deleteSupplier',
    SAVE_SUPPLIER: 'saveSupplier',
    GET_ALL_RELEASEABLECODE: 'getAllReleaseAbleCode',
    GET_ALL_STOCK: 'getAllStock',
    DELETE_STOCK: 'deleteSupplier',
    SAVE_STOCK: 'saveSupplier',
    GET_ALL_HOSPITAL_WARD: 'getAllHospitalWard',
    GET_ALL_USER_POSITION: 'getAllUserPosition',
    GET_ALL_USER: 'getAllUser',
    DELETE_USER: 'deleteUser',
    SAVE_USER: 'saveUser',
    GET_ALL_ROLE: 'getAllRole',
};

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
