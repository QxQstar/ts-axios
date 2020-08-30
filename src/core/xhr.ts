import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const xhr = new XMLHttpRequest()
    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.open(method.toUpperCase(), url!, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 0) {
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
      handleResponse(response)
    }
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            xhr,
            null,
            response
          )
        )
      }
    }

    xhr.onerror = function() {
      reject(createError('Network Error', config, xhr, 'ECONNABORTED'))
    }

    xhr.ontimeout = function() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, xhr, null))
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
