import { Method } from '../types'
import { isPlainObject } from './util'
import mergeConfig, { deepMerge } from '../core/mergeConfig'

function normalizedHeaderName(headers: any, name: string): void {
  Object.keys(headers).forEach(key => {
    if (key !== name && key.toUpperCase() === name.toUpperCase()) {
      headers[name] = headers[key]
      delete headers[key]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  if (isPlainObject(data) && headers) {
    normalizedHeaderName(headers, 'Content-Type')
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let result = Object.create(null)
  if (!headers) {
    return result
  }

  const headersArr = headers.split('\r\n')
  headersArr.forEach(parts => {
    let [key, val] = parts.split(':')
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    result[key] = val
  })

  return result
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  const result = deepMerge(headers.common || {}, headers[method.toLocaleLowerCase()] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete result[method]
  })

  return result
}
