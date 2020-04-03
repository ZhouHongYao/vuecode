import { read, modify } from "@/api/index"

export function dashboardTJ(data) { //我的面板数据统计
    return read('/admin-api/dashboard', data)
}

export function dashboardEchart(data) { //我的面板走势图
    return modify('/admin-api/line ', data)
}
