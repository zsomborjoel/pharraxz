import axios from 'axios';
import TokenService from './TokenService';
import { ENDPOINTS } from '../config/constants';

const instance = axios.create({
    baseURL: ENDPOINTS.BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();

        if (token && config.headers) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`; // for Spring Boot back-end
        }

        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (res) => res,
    async(err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/auth/login' && err.response) {
            // Access Token was expired
            // eslint-disable-next-line no-underscore-dangle
            if (err.response.status === 401 && !originalConfig._retry) {
                // eslint-disable-next-line no-underscore-dangle
                originalConfig._retry = true;

                try {
                    const rs = await instance.post('/auth/refreshtoken', {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });
                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    },
);

export default instance;
