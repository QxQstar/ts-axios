import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  config: AxiosRequestConfig
  request: any
  isAxiosError: boolean
  code?: string | null
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    request: any,
    code?: string | null,
    response?: AxiosResponse
  ) {
    super(message)
    this.response = response
    this.config = config
    this.isAxiosError = true
    this.code = code
    this.request = request

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  request: any,
  code?: string | null,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, request, code, response)
}
