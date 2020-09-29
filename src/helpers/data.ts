import { isPlainObject } from './util'
import qs from 'qs'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return qs.stringify(data)
  } else {
    return data
  }
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // todo something
    }
  }

  return data
}
