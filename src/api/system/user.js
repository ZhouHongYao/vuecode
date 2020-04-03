/**
 * @author zhy 2018-07-5
 * @description 角色组-成员-相关接口
 */
import { read, del, update, modify } from "@/api/index"

export function getuserGroup() { //获取用户组
    return read('/admin-api/auth-select')
}

export function userList(data) { //管理员列表
    return read('/admin-api/users', data)
}

export function userRead(id) { //读取管理员
    return read('/admin-api/user/' + id)
}

export function userSet(data) { //添加管理员
    return modify('/admin-api/user', data)
}

export function userDel(data) { //删除管理员
    return del('/admin-api/user', data)
}

export function userQiyong(data) { //启用禁用
    return update('/admin-api/user', data)
}

export function userChange(group) { //角色切换
    return read('/admin-api/userinfo/' + group)
}

export function changepwd(data) { //修改密码
    return update('/admin-api/changepwd', data)
}
