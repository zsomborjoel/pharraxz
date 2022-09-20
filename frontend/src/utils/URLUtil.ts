import { useParams } from 'react-router-dom';

export const buildURL = (url: string, params: any): string => {
    let result = url;

    Object.keys(params).forEach((key: string) => {
        const value = params[key];
        result = result.replace(`:${key}`, encodeURIComponent(value));
    });

    return result;
};

export const getDecodedParams = <T extends { [K in keyof T]?: string | undefined }>(): T => {
    const params = useParams<T>();
    const decodedParams: T = {} as T;

    (Object.keys(params) as Array<keyof T>).forEach((key: keyof T) => {
        decodedParams[key] = decodeURIComponent(params[key] as any) as any;
    });

    return decodedParams;
};
