import {request} from '@/plugins/request'

function login(data){
  return request({
    method: "POST",
    url: "/api/users/login",
    data,
  })
}
function register(data){
  return request({
    method: "POST",
    url: "/api/users",
    data
  })
}

export {
  login,
  register
}