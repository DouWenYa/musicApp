export function addClass(dom, className) {
  if (hasClass(dom, className)) {
    return
  }
  let newClass = dom.className.split(' ')
  newClass.push(className)
  dom.className = newClass.join(' ')
}
export function hasClass(dom, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(dom.className)
}
// 获取或设置自定义属性
export function data(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}
// 添加transfrom兼容前缀；
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
