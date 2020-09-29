import { AxiosRequestConfig } from './types'

const methodNoData = ['delete', 'get', 'options', 'head']
const methodWithData = ['post', 'put', 'patch']

const defaults: AxiosRequestConfig = {
  timeout: 1000,
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

methodNoData.forEach(method => {
  defaults.headers[method] = {}
})

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
