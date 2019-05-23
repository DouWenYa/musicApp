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
export function data(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}
