import state from './state'

// 导入LocalStorage的封装器，详细使用方式参考 Git上storejs
import LS from 'storejs'

// 定义数据仓库前缀，避免保存到LocalStorage中的数据节点冲突
var sysKeys = 'DB_VUECODE_ADMIN_'

// mutations

/* 从本地存储读取数据 */
for (var item in state) {
	LS.get(sysKeys + item) ? state[item] = JSON.parse(LS.get(sysKeys + item)) : false
}

// 从组件中提交请求方法，写在此类下，注意保存时，一定要保存为json
const mutations = {

	setPageSize(state, payload) {
		state.pageSize = payload
		LS.set(sysKeys + 'pageSize', JSON.stringify(state.pageSize))
	},
	// 记录最后操作时间
	setLast_time(state, payload) {
		state.last_time = payload
		LS.set(sysKeys + 'last_time', JSON.stringify(state.last_time))
	},
	// 存储用户信息
	setUserinfo(state, payload) {
		state.user = payload
		LS.set(sysKeys + 'user', JSON.stringify(state.user))
	},
	// 存储导航菜单节点
	setRoles(state, payload) {
		state.roles = payload
		LS.set(sysKeys + 'roles', JSON.stringify(state.roles))
	},
	setAddRouters(state, payload) {
		state.addRouters = payload
		LS.set(sysKeys + 'addRouters', JSON.stringify(state.addRouters))
	},
	setRouters(state, payload) {
		state.routers = payload
		LS.set(sysKeys + 'routers', JSON.stringify(state.routers))
	},
	//设置用户组
	setUserGroup(state, payload) {
		state.userGroup = payload
		LS.set(sysKeys + 'userGroup', JSON.stringify(state.userGroup))
	},
	//设置主题换肤
	setTheme(state, payload) {
		state.originalTheme = payload
		LS.set(sysKeys + 'originalTheme', JSON.stringify(state.originalTheme))
	},
	//设置缓存时间
	setLastModified(state, payload) {
		state.LastModified = payload
		LS.set(sysKeys + 'LastModified', JSON.stringify(state.LastModified))
	},
	// 设置系所缓存
	setXisuoData(state, payload) {
		state.xisuoData = payload
		LS.set(sysKeys + 'xisuoData', JSON.stringify(state.xisuoData))
	},
	// 设置服务类型（公共服务D）
	setGenre(state, payload) {
		state.GenreData = payload
		LS.set(sysKeys + 'GenreData', JSON.stringify(state.GenreData))
	},
	// 设置头像
	setAvatar(state, payload) {
		state.avatarData = payload
		LS.set(sysKeys + 'avatarData', JSON.stringify(state.avatarData))
	},
	// 设置学术任职 任职事项
	setOfficeData(state, payload) {
		state.officeData = payload
		LS.set(sysKeys + 'officeData', JSON.stringify(state.officeData))
	},
	// 设置学术任职 任职事项
	setDutyData(state, payload) {
		state.dutyData = payload
		LS.set(sysKeys + 'dutyData', JSON.stringify(state.dutyData))
	},
	// 设置期刊任职 任职事项
	setRenzhiData(state, payload) {
		state.renzhiData = payload
		LS.set(sysKeys + 'renzhiData', JSON.stringify(state.renzhiData))
	},
	// 设置期刊任职 担任职务
	setZhiwuData(state, payload) {
		state.zhiwuData = payload
		LS.set(sysKeys + 'zhiwuData', JSON.stringify(state.zhiwuData))
	},
	// 设置国内外知名大学教授 担任职务
	setProfessorData(state, payload) {
		state.professorData = payload
		LS.set(sysKeys + 'professorData', JSON.stringify(state.professorData))
	},
	// 设置科普宣传 宣传类型
	setPropagateData(state, payload) {
		state.propagateData = payload
		LS.set(sysKeys + 'propagateData', JSON.stringify(state.propagateData))
	},
	// 设置科普宣传 类型
	setLectureData(state, payload) {
		state.lectureData = payload
		LS.set(sysKeys + 'lectureData', JSON.stringify(state.lectureData))
	},
	// 设置主办国际会议 会议类型
	setMeetData(state, payload) {
		state.meetData = payload
		LS.set(sysKeys + 'meetData', JSON.stringify(state.meetData))
	},
	// 设置活动类型 参加国际会议
	setActivityCategory(state, payload) {
		state.activityCategory = payload
		LS.set(sysKeys + 'activityCategory', JSON.stringify(state.activityCategory))
	},
	// 设置参加形式 参加国际会议
	setParticipationData(state, payload) {
		state.participationData = payload
		LS.set(sysKeys + 'participationData', JSON.stringify(state.participationData))
	},
	//设置是否第一次显示引导
	setGuide(state, payload) {
		state.guide_show = payload
		LS.set(sysKeys + 'guide_show', JSON.stringify(state.guide_show))
	}

}

export default mutations
