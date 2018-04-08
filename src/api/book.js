import request from '@/utils/request'

const query = (data) => {
  return request({
    url: 'book/query',
    method: 'post',
    data
  })
}
const del = (params) => {
  return request({
    url: 'book/del',
    method: 'post',
    params
  })
}
const update = (params) => {
  return request({
    url: 'book/update',
    method: 'post',
    params
  })
}
const upload = (data) => {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'book/add',
    method: 'post',
    data
  })
}
export { query, del, update, upload }

