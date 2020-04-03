/**
 * @author zhy 2018-07-12
 * @description axios 封装
 */
import {
  fetch,
  fetch_get
} from '@/utils/fetch'

// 插入
export function modify(url, data) {
  return fetch({
    url: url,
    data: data,
    method: 'post'
  })
}

// 数据查询
export function read(url, data) {
  return fetch_get({
    url: url,
    params: data,
    method: 'get'
  })
}

//  数据删除
export function del(url, data) {
  data._method = "DELETE"
  return fetch({
    url: url,
    data: data,
    method: 'post'
  })
}

//  数据更新
export function update(url, data) {
  data._method = "PUT"
  return fetch({
    url: url,
    data: data,
    method: 'post'
  })
}

//  数据写入
export function write(url, data, method) {
  if (method == 'put') {
    data._method = "PUT"
  }
  return fetch({
    url: url,
    data: data,
    method: "post"
  })
}
