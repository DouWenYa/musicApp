import orignJSONP from 'jsonp'
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + getParams(data)
  return new Promise((resolve, reject) => {
    orignJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
function getParams(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
