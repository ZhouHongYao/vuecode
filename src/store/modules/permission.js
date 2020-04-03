import { asyncRouterMap, constantRouterMap } from '@/router'
import store from '@/store'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param group
 * @param name
 * @param route
 */
function hasPermission(route) {
	if (route.name) {
		const arr = store.getters.roles
		if (!arr.find(item => { return item.name === route.name })) {
			return false
		} else {
			const role = arr.find(item => { return item.name === route.name }).rules
			if (role.find(item => { return parseInt(store.getters.group) == item })) {
				return true
			} else {
				return false
			}
		}
	} else {
		if (route.hidden) {
			return true
		} else {
			return false
		}
	}
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 */
function filterAsyncRouter(asyncRouterMap) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (hasPermission(route)) {
			if (route.children && route.children.length) {
				route.children = filterAsyncRouter(route.children)
			}
			return true
		}
		return false
	})
	return accessedRouters
}

const permission = {
	mutations: {
		SET_ROUTERS: (state, routers) => {
			store.dispatch('setRouters', constantRouterMap.concat(routers))
			store.dispatch('setAddRouters', routers)
		}
	},
	actions: {
		GenerateRoutes({ commit }) {
			return new Promise(resolve => {
				let accessedRouters
				if (store.getters.group === 1) {
					//过滤基本信息 myInfo
					asyncRouterMap[0]['children'].splice(1, 1);
					accessedRouters = asyncRouterMap
				} else {
					accessedRouters = filterAsyncRouter(asyncRouterMap)
				}
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		}
	}
}

export default permission
