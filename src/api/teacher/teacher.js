/**
 * @author zhy 2018-07-16
 * @description 教师模块-相关接口
 */
import { read, write, del, update } from '@/api/index'

export function teacherList(params) { //教师列表
	return read('/admin-api/teacher', params)
}

export function teacherDel(id) { //删除教师
	return del('/admin-api/teacher', id)
}

export function teacherRead(id) { //教师详情
	return read('/admin-api/teacher/' + id)
}

export function teacherEdit(data, method) { //教师编辑
	return write('/admin-api/teacher', data, method)
}

export function imgEdit(data) { //修改头像
	return update('/admin-api/set-head', data)
}

export function getImgs(data) { //获取默认头像
	return read('/admin-api/headimg', data)
}

