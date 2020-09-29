import { AxiosRequestConfig } from './types'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const methodNoData = ['delete', 'get', 'options', 'head']
const methodWithData = ['post', 'put', 'patch']

const defaults: AxiosRequestConfig = {
  timeout: 1000,
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [defaulttTansformRequest],
  transformResponse: [defaultTransformResponse]
}

methodNoData.forEach(method => {
  defaults.headers[method] = {}
})

methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

function defaulttTansformRequest(data: any, header: any): any {
  processHeaders(header, data)
  return transformRequest(data)
}

function defaultTransformResponse(data: any): any {
  return transformResponse(data)
}

export default defaults
