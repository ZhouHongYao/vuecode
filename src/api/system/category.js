/**
 * @author zhy 2018-06-13
 * @description 字典表模块-相关接口
 */
import { del, read, write, update, modify } from "@/api/index";

export async function cateList() { //获取字典表主数据
	return read('/admin-api/cate')
}

export async function cateDel(id) { //字典表节点删除
	return del('/admin-api/cate', id)
}

export async function cated_read(id) { //读取 单项字典表数据
	return read('/admin-api/cate/' + id)
}

export async function cated_add(data) { //添加 子类单项字典表
	return modify('/admin-api/cate', data)
}

export async function cated_edit(data) { //编辑 子类单项字典表
	return update('/admin-api/cate', data)
}

export async function cated(form, type) { //添加 编辑 节点单项字典表
	return write('/admin-api/cate', form, type)
}

export async function cateSort(data) { //节点排序
	return update('/admin-api/cate-sort', data)
}

export async function cateDrag(data) { //节点拖拽
	return update('/admin-api/cate-drag', data)
}

export async function cateChild(pid) { //获取子集
	return read('/admin-api/cate-pid/' + pid)
}

export async function selectTree(id) { //级选
	return read('/admin-api/select-tree/' + id)
}

