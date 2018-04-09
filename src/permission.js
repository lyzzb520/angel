import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      // console.log('拉取用户信息')
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          if (res.code !== 0) {
            if (res.code === 20000) {
              window.location.href = '404'
            } else {
              store.dispatch('FedLogOut').then(() => {
                Message({
                  message: '验证失败, 请重新登录',
                  type: 'error',
                  duration: 3 * 1000
                })
                next({ path: '/login' })
              })
            }
          }
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message({
              message: '验证失败, 请重新登录',
              type: 'error',
              duration: 3 * 1000
            })
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
