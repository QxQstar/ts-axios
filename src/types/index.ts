// 定义字符串字面量类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'del'
  | 'DEL'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
}
