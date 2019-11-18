import jsonp from 'common/js/jsonp'
import axios from 'axios'
import { commonParams, options } from 'api/config'
export function getRecommend() {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const params = Object.assign({}, commonParams, {
    uin: '0',
    paltform: 'h5',
    needNewCode: '1'
  })
  return jsonp(url, params, options)
}
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
export function getCDinfo(disstid) {
  const url = '/api/getCdinfo'
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const params = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: '0',
    new_format: '1',
    g_tk: 5381,
    loginUin: '0',
    hostUin: '0',
    notice: '0',
    platform: 'yqq.json',
    needNewCode: '0'
  })
  // return jsonp(url, params, options)
  return axios
    .get(url, {
      params: params
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
