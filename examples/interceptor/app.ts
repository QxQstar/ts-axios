import axios from '../../src'

axios.interceptors.request.use(config => {
    config.headers.test += '1'
    return config
})

axios.interceptors.request.use((config) => {
    config.headers.test += '1'
    return config
})

axios.interceptors.response.use(res => {
    res.data += '1'
    return res
})

axios({
    url: '/interceptor/get',
    method: 'get',
    headers: {
        test: 1
    }
}).then((res) => {
    console.log(res)
})