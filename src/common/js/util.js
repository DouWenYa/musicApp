function getRandomNum(min, max) {
  return (Math.ramdom * (max - min) + min) | 0
}
export function shuffle(arr) {
  let _arr = [...arr]
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomNum(0, i)
    let temp = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = temp
  }
  return _arr
}
