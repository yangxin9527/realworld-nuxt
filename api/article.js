import { request } from '@/plugins/request'

function getArticles(params){
  return request({
    url: "/api/articles",
    params
  })
}
function getFeedArticles(params){
  return request({
    url: "/api/articles/feed",
    params
  })
}
function addFavorite(slug){
  return request({
    method:'POST',
    url: `/api/articles/${slug}/favorite`

  })
}
function deleteFavorite(slug){
  return request({
    method:'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

function getArticle(slug){
  return request({
    method:'GET',
    url: `/api/articles/${slug}`
  })
}
function getComments(slug){
  return request({
    method:'GET',
    url: `/api/articles/${slug}/comments`
  })
}
function addComments({slug,data}){
  return request({
    method:'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}
function deleteComment({slug,id}){

  return request({
    method:'DELETE',
    url: `/api/articles/${slug}/comments/${id}`

  })
}

export {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
  getArticle,
  getComments,
  addComments,
  deleteComment,
}