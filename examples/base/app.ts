import axios from '../../src/index'

// axios({
//   url:'/base/get',
//   params:{
//     a:1,
//     b:2
//   }
// })
//
// axios({
//   url:'/base/get',
//   params:{
//     a:1,
//     b:null
//   }
// })
//
// axios({
//   url:'/base/get',
//   params:{
//     a:[1,2]
//   }
// })
//
// axios({
//   url:'/base/get',
//   params:{
//     a:{
//       name:'22'
//     }
//   }
// })
//
// axios({
//   url:'/base/get',
//   params:{
//     a:'@:[33]'
//   }
// })
//
// axios({
//   url:'/base/get#hass',
//   params:{
//     a:'@:[33]'
//   }
// })
//
// axios({
//   url:'/base/get?b=3',
//   params:{
//     a:'55'
//   }
// })
//
// axios({
//   url:'/base/get?b=3',
//   params:{
//     date:new Date()
//   }
// })

axios({
  url:'/base/post',
  method: 'post',
  data:{
    a:'a',
    b:'b'
  }
})

axios({
  url:'/base/buffer',
  method: 'post',
  data:new Int32Array([100,200])
})
