import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '@/config'
import { refreshToken, isRefreshToken } from './util'
import router from '@/router'
export interface ResponseError extends Error {
  config: AxiosRequestConfig;
  request: AxiosPromise;
  response: AxiosResponse;
}

export interface AxiosResponse {
  data: any;
  headers: any;
  ok: boolean;
  request: AxiosPromise;
  status: number;
  statusText: string;
  url: string;
}

export interface AxiosPromise extends Promise<AxiosResponse> {
  cancel(callback?: () => void): void;
  clearTimeout(timeout?: number): void;
  config: AxiosRequestConfig;
}

const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('y_t')}`,
  }
})

// 请求拦截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('config.url',config.url); 
    if (config.url.indexOf('/refresh_token') === -1) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('y_t')}`;
    }
    return config;
  },
  (error: ResponseError) => {
    console.log('!请求接口错误', error);
    return Promise.reject()
  }
)

//响应拦截
service.interceptors.response.use(
  async (response) => {
    if (response.headers.authorization) {
      const token = response.headers.authorization.replace('Bearer ', '')
      if (token) {
        localStorage.setItem('y_t', token);
        service.defaults.headers.Authorization = `Bearer ${token}`;
      }
    }
    // 刷新token在放回数据里
    if (response.headers.refreshToken) {
      if (response.headers.refreshToken) {
        const refreshToken = response.headers.refreshToken.replace('Bearer ', '')
        localStorage.setItem('y_r_t', refreshToken);
      }
    }
    // 刷新token
    if (response.data.code === 401 && isRefreshToken(response.config)) {
      console.log('!token过期');
      if(!localStorage.getItem('y_r_t')){
        console.log('没有refreshtoken');
        router.push('/login');
        return;
      }
      const isSuccess = await refreshToken();
      console.log('isSuccess', isSuccess);
      if (isSuccess) {
        // 重新请求
        console.log('!重新请求', localStorage.getItem('y_t'));
        response.config.headers.Authorization = `Bearer ${localStorage.getItem('y_t')}`;
        const resp = await service.request(response.config)
        return resp
      } else {
        console.log('!重新请求失败');
        router.push('/login');
      }
    }
    return response.data;
  },
  (error: ResponseError) => {
    console.log('!响应接口错误', error);
    return Promise.reject()
  }
)


export default service;
