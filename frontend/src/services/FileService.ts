import axios, { AxiosResponse } from 'axios';
import AuthHeader from '../utils/AuthHeader';
import { ENDPOINTS } from '../configs/constants';
import { File } from './model/File';

const download = (fileNameWithPath: string): Promise<AxiosResponse<Blob>> =>
    axios.get(`${ENDPOINTS.FILE}/download`, {
        params: { fileNameWithPath },
        headers: AuthHeader(),
        responseType: 'blob',
    });

const list = (path: string): Promise<AxiosResponse<File[]>> =>
    axios.get(`${ENDPOINTS.FILE}/list`, { params: { path }, headers: AuthHeader() });

const del = (path: string): Promise<AxiosResponse<void>> =>
    axios.delete(`${ENDPOINTS.FILE}/delete`, { params: { path }, headers: AuthHeader() });

const FileService = {
    download,
    list,
    del,
};

export default FileService;
