// 定义字符串字面量类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  [attr: string]: any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosError extends Error {
  response?: AxiosResponse
  config: AxiosRequestConfig
  code?: string | null
  request: any
  isAxiosError: boolean
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosInterceptors {
  request: AxiosInterceptorsManager<AxiosRequestConfig>
  response: AxiosInterceptorsManager<AxiosResponse>
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: AxiosInterceptors
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export interface AxiosInterceptorsManager<T> {
  use(resolvedFn: ResolvedFn<T>, rejectedFn?: RejectedFn): number
  forEach(fn: (interceptor: Interceptor<T>) => void): void
  reject(id: number): void
}

export interface ResolvedFn<T = any> {
  (config: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
