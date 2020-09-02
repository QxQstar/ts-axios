import { AxiosPromise, AxiosRequestConfig, Method, Axios as AxiosInterface } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios implements AxiosInterface {
  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
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
