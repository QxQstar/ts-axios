import axios from '../../src/index'

axios.defaults.headers.common.hehe = '5555'
axios('/extend/post',{
  method: 'post',
  data: {
    msg: 'hi function'
  }
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
