import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    xhr.open(method.toUpperCase(), url, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return
      }
      const responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
      const response: AxiosResponse = {
        status: xhr.status,
        statusText: xhr.statusText,
        request: xhr,
        data: responseData,
        headers: parseHeaders(xhr.getAllResponseHeaders()),
        config
      }

      resolve(response)
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })
    xhr.send(data)
  })
}
