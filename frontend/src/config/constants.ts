import { SERVER_URL } from './env';

export const ENDPOINTS = {
    BASE: SERVER_URL,
    REFRESH_TOKEN: `${SERVER_URL}/auth/refreshtoken`,
    LOGIN: `${SERVER_URL}/auth/login`,
    ORDER: `${SERVER_URL}/orders`,
    USER: `${SERVER_URL}/users`,
    PRODUCT: `${SERVER_URL}/products`,
};
