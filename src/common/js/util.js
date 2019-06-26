function getRandomNum(min, max) {
  return (Math.ramdom * (max - min) + min) | 0
}
export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomNum(0, i)
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}
