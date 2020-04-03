const getters = {
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  permission_routers: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs,
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  pageSizes: state => state.pageSizes,
  pageSize: state => state.pageSize,
  head: state => state.user.userinfo.head || '',
  name: state => state.user.userinfo.name || '',
  account: state => state.user.userinfo.account || '',
  group: state => state.user.userinfo.group, //用户角色
  roles: state => state.roles, //路由对应的角色组
  setting: state => state.setting, //主题设置
  routers: state => state.routers, //路由导航
  addRouters: state => state.addRouters, //动态//动态路由
  Request_Head: state => {
    return {
      "Authorization": state.user.userinfo.token || ''
    }
  }
}
export default getters
