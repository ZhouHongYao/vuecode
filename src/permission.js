import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import {
//   getRoles
// } from "@/api/login.js"

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// permissiom judge function
const whiteLists = ['401', '404', '500']

function hasPermission(name) {
  if (store.getters.group && store.getters.group === 1) {
    return true
  } // admin permission passed directly
  if (!name) {
    return true
  }
  if (whiteLists.indexOf(name) !== -1) {
    return true
  }
  const arr = store.getters.roles
  if (!arr.find(item => {
      return item.name === name
    })) {
    return false
  } else {
    const role = arr.find(item => {
      return item.name === name
    }).rules
    if (role.find(item => {
        return parseInt(store.getters.group) === item
      })) {
      return true
    } else {
      return false
    }
  }
}

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (store.state.user && store.state.user.userinfo && store.state.user.userinfo.token) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.state.roles.length === 0) {
        // getRoles().then(rs => {
          store.dispatch("setRoles", [{ rules: [1, 2, 3, 6, 7, 13, 19, 11, 9, 10, 14, 15, 16, 17, 18, 20, 21, 12], name: "dashboard" },
           { rules: [1, 2], name: "node" },
           { rules: [1, 2], name: "category" },
           { rules: [1, 2], name: "log" },
           { rules: [1, 2], name: "system" },
           { rules: [1, 2], name: "list" },
           { rules: [1, 2], name: "group" }]).then(() => {
            store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表, group为1： 超管过滤权限
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({
                ...to,
                replace: true
              }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
        // }).catch(() => {
        //   store.dispatch("setUserinfo", {
        //     userinfo: {},
        //     rules: []
        //   });
        //   store.dispatch("setRoles", []);
        //   store.dispatch("setRouters", []);
        //   store.dispatch("setAddRouters", []);
        //   next({
        //     path: '/login'
        //   })
        // })
      } else {
        if (!to.name) {
          store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表, group为1： 超管过滤权限
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }
        if (hasPermission(to.name)) {
          next()
        } else {
          next({
            path: '/401',
            replace: true,
            query: {
              noGoBack: true
            }
          })
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
