import axios from 'axios'
 
const request = axios.create({
  baseURL:'https://conduit.productionready.io'
 
})
// 请求拦截器
// 公共业务处理
request.interceptors.request.use(function (config){
  console.log(config)
  // config.headers.Authorization:'Token '
  return config
},function (error){
  return Promise.reject(error)
})

export default request