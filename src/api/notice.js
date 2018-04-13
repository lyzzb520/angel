import request from '@/utils/request'

const query = (data) => {
  return request({
    url: 'notice/query',
    method: 'post',
    data
  })
}
const queryAll = (data) => {
  return request({
    url: 'site/queryall',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'notice/del',
    method: 'post',
    params
  })
}
const update = (params) => {
  return request({
    url: 'notice/update',
    method: 'post',
    params
  })
}
const add = (data) => {
  return request({
    url: 'notice/add',
    method: 'post',
    data
  })
}
export { query, del, update, add, queryAll }

