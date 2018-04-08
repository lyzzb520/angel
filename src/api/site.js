import request from '@/utils/request'

const query = (data) => {
  return request({
    url: 'site/query',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'site/del',
    method: 'post',
    params
  })
}
const update = (params) => {
  return request({
    url: 'site/update',
    method: 'post',
    params
  })
}
const add = (data) => {
  return request({
    url: 'site/add',
    method: 'post',
    data
  })
}
export { query, del, update, add }

