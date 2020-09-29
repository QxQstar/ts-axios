import { isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

/**
 * 创建合并字段的策略集
 */
function createMergeFuncMap() {
  const mergefuncMap = Object.create(null)
  function defaultMergeFunc(value1: any, value2: any): any {
    return typeof value2 !== 'undefined' ? value2 : value1
  }

  function formValue2MergeFunc(value1: any, value2: any): any {
    return value2
  }

  function deepMergeFunc(value1: any, value2: any): any {
    if (isPlainObject(value2)) {
      return deepMerge(value1, value2)
    } else if (typeof value2 !== 'undefined') {
      return value2
    } else if (isPlainObject(value1)) {
      return deepMerge(value1)
    } else if (typeof value1 !== 'undefined') {
      return value1
    }
  }

  mergefuncMap['default'] = deepMergeFunc
  const formValue2Fileds = ['url', 'params', 'data']
  formValue2Fileds.forEach(filed => {
    mergefuncMap[filed] = formValue2MergeFunc
  })
  const deepMergeFileds = ['headers', 'auth']
  deepMergeFileds.forEach(filed => {
    mergefuncMap[filed] = deepMergeFunc
  })

  return mergefuncMap
}

const mergefuncMap = createMergeFuncMap()

/**
 * 对多个对象进行深度合并
 * @param objs 对象数组
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        if (isPlainObject(obj[key])) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], obj[key])
          } else {
            result[key] = deepMerge(obj[key])
          }
        } else {
          result[key] = obj[key]
        }
      })
    }
  })

  return result
}

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  const config = Object.create(null)

  if (!userConfig) {
    userConfig = {}
  }
  for (const key in userConfig) {
    mergeVal(key)
  }

  for (const key in defaultConfig) {
    if (!userConfig[key]) {
      mergeVal(key)
    }
  }

  function mergeVal(key: string): any {
    const mergeFunc = mergefuncMap[key] || mergefuncMap['default']
    config[key] = mergeFunc(defaultConfig[key], userConfig![key])
  }
  return config
}
