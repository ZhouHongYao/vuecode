// 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
const actions = {
	setPageSize({ commit }, data) {
		commit('setPageSize', data)
	},
	// 存储用户信息
	setUserinfo({ commit }, data) {
		commit('setUserinfo', data)
	},
	// 存储导航菜单节点
	setRoles({ commit }, data) {
		commit('setRoles', data)
	},
	// 存储动态路由
	setAddRouters({ commit }, data) {
		commit('setAddRouters', data)
	},
	// 存储路由
	setRouters({ commit }, data) {
		commit('setRouters', data)
	},
	//设置用户组
	setUserGroup({ commit }, data) {
		commit('setUserGroup', data)
	},
	//设置主题换肤
	setTheme({ commit }, data) {
		commit('setTheme', data)
	},
	//设置缓存时间
	setLastModified({ commit }, data) {
		commit('setLastModified', data)
	},
	//设置系所
	setXisuo({ commit }, data) {
		commit('setXisuoData', data)
	},
	//设置服务类型（公共服务D）
	setGenre({ commit }, data) {
		commit('setGenre', data)
	},
	//设置头像
	setAvatar({ commit }, data) {
		commit('setAvatar', data)
	},
	//设置学术任职任职事项
	setOfficeData({ commit }, data) {
		commit('setOfficeData', data)
	},
	//设置学术任职担任职务
	setDutyData({ commit }, data) {
		commit('setDutyData', data)
	},
	//设置期刊任职任职事项
	setRenzhiData({ commit }, data) {
		commit('setRenzhiData', data)
	},
	//设置期刊任职担任职务
	setZhiwuData({ commit }, data) {
		commit('setZhiwuData', data)
	},
	//设置国内外知名大学教授担任职务
	setProfessorData({ commit }, data) {
		commit('setProfessorData', data)
	},
	//设置科普宣传 宣传类型
	setPropagateData({ commit }, data) {
		commit('setPropagateData', data)
	},
	//设置科普宣传 类型
	setLectureData({ commit }, data) {
		commit('setLectureData', data)
	},
	//设置主办国际会议 会议类型
	setMeetData({ commit }, data) {
		commit('setMeetData', data)
	},
	//设置活动类型 参加国际会议
	setActivityCategory({ commit }, data) {
		commit('setActivityCategory', data)
	},
	//设置参加形式 参加国际会议
	setParticipationData({ commit }, data) {
		commit('setParticipationData', data)
	}
}

export default actions
