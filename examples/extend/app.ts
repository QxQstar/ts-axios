import axios from '../../src/index'
import {AxiosTransformer} from '../../src/types'

axios.defaults.headers.common.hehe = '5555'
axios('/extend/post',{
  method: 'post',
  data: {
    msg: 'hi function'
  },
  transformRequest:[function(data,header) {
    header['Content-Type'] = 'application/json'
    data.cus = 'cus'
    return JSON.stringify(data)
  }],
  transformResponse:[...(axios.defaults.transformResponse as AxiosTransformer[]) ,function(data) {
    data.jj = 'jj'
    return data
  }]
}).then((res) => {
  console.log(res.data)
}).catch((err) => {
  console.log(err)
})

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  },
  headers:{
    rr:'333'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })
