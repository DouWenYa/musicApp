import { commonParams } from './config'
import axios from 'axios'
export function getMusicVkey(mid) {
  const url = '/api/musicVkey'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    uin: 0,
    cid: 205361747,
    // guid: 2090286744,
    // songmid: mid,
    // filename: 'C400' + mid + '.m4a',
    data: {
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: { guid: '2090286744', calltype: 0, userip: '' }
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '2090286744',
          songmid: [mid],
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20'
        }
      },
      comm: { uin: 0, format: 'json', ct: 24, cv: 0 }
    }
  })
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
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
