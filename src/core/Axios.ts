import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  Axios as AxiosInterface,
  AxiosInterceptors,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import AxiosInterceptorsManager from './axiosInterceptorsManager'
import mergeConfig, { deepMerge } from './mergeConfig'

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios implements AxiosInterface {
  interceptors: AxiosInterceptors
  defaults: AxiosRequestConfig
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new AxiosInterceptorsManager<AxiosRequestConfig>(),
      response: new AxiosInterceptorsManager<AxiosResponse>()
    }
  }
  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config)

    const promiseChain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(function(interceptor) {
      promiseChain.unshift(interceptor)
    })

    this.interceptors.response.forEach(function(interceptor) {
      promiseChain.push(interceptor)
    })

    let promise = Promise.resolve(config) as AxiosPromise

    while (promiseChain.length) {
      const { resolved, rejected } = promiseChain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'options', config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'head', config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData(url, 'delete', config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'post', data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'put', data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData(url, 'patch', data, config)
  }
  _requestWithoutData(url: string, method: Method, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method: method,
        url
      })
    )
  }
  _requestWithData(
    url: string,
    method: Method,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method: method,
        data,
        url
      })
    )
  }
}
