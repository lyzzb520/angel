import request from '@/utils/request'

const resetpwd = (data) => {
  return request({
    url: 'setting/resetpwd',
    method: 'post',
    data
  })
}
const updateSetting = (data) => {
  return request({
    url: 'setting/updatesetting',
    method: 'post',
    data
  })
}
const getSetting = () => {
  return request({
    url: 'setting/getsetting',
    method: 'get'
  })
}
export { resetpwd, updateSetting, getSetting }

