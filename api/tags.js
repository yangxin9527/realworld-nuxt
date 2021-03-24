import { request } from '@/plugins/request'

function getTags(){
  return request({
    url: "/api/tags"
  })
}

export {
  getTags
}