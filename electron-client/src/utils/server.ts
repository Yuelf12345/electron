import axios, { AxiosInstance, AxiosRequestConfig,InternalAxiosRequestConfig } from 'axios';
import { BASE_URL,REQUEST_TIMEOUT } from '@/config'
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
    timeout: REQUEST_TIMEOUT
})

// 请求拦截
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error:ResponseError) =>{
      console.log('!请求接口错误',error);
      return Promise.reject()
    }
  )
  
  //响应拦截
  service.interceptors.request.use(
    (response:InternalAxiosRequestConfig) => {
      // if(response.status === 200){
      //     return response;
      // }else{
      //     Promise.reject()
      // }
      return response;
    },
    (error:ResponseError) =>{
      console.log('!响应接口错误',error);
      return Promise.reject()
    }
  )
  

export default service;
