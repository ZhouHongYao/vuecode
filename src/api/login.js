/**
 * @author zhy 2018-07-5
 * @description 登录-相关接口
 */
import { read, modify } from '@/api/index'

export function login(params) { //登录
    return modify('/admin-api/login', params)
}

export async function getRoles() { //获取权限
    return read('/admin-api/routers')
}
