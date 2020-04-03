/**
 * @author zhy 2018-07-5
 * @description 导航菜单-相关接口
 */
import { read, update, write, del } from '@/api/index'

export function nodeList() { //导航菜单列表
    return read('/admin-api/node')
}

export function nodeSort(data) { //导航菜单排序
    return update('/admin-api/node-sort', data)
}

export function nodeEdit() { //导航菜单节点编辑
    return update('/admin-api/node')
}

export function nodeDel(data) { //导航菜单节点删除
    return del('/admin-api/node', data)
}

export function nodeWrite(data, type) { //导航菜单添加、编辑
    return write('/admin-api/node', data, type)
}

export function nodeRead(id) { //导航菜单节点读取
    return read('/admin-api/node/' + id)
}

export function nodeDrag(data) { //节点拖拽
    return update('/admin-api/node-drag', data)
}
