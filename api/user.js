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
function UpdateUser(data){
  return request({
    method: "PUT",
    url: "/api/user",
    data
  })
}


function getProfile(username){
  return request({
    method: "GET",
    url: "/api/profiles/"+username
  })
}
function follow(username){
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`
  })
}

function unFollow(username){
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`
  })
}



export {
  login,
  register,
  UpdateUser,
  getProfile,
  follow,
  unFollow
}