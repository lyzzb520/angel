import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '系统设置', icon: 'setting' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/setting/index',
    name: 'Home',
    hidden: true
  },

  // {
  //   path: '/content',
  //   component: Layout,
  //   redirect: '/content/site',
  //   name: 'Example',
  //   meta: { title: '资源管理', icon: 'example' },
  //   children: [

  //   ]
  // },
  {
    path: '/site',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Site',
        component: () => import('@/views/site/index'),
        meta: { title: 'B站管理', icon: 'site' }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Video',
        component: () => import('@/views/video/index'),
        meta: { title: '视频管理', icon: 'video' }
      }
    ]
  },
  {
    path: '/pic',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Pic',
        component: () => import('@/views/pic/index'),
        meta: { title: '图片管理', icon: 'pic' }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Book',
        component: () => import('@/views/book/index'),
        meta: { title: '文学管理', icon: 'book' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

