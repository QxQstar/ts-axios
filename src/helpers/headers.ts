import { isPlainObject } from './util'

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
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
