/*
* 数组中一定要有该元素，不然会死循环
*/
export const findElement = (arr, e, key = null) => {
  let i = 0
  if (key === null) { // 值类型
    while (arr[i] !== e) i++
  } else { // 对象类型
    if (typeof e === 'object') {
      e = e[key]
    }
    while (arr[i][key] !== e) i++
  }
  return i
}

export function removeElement (arr, e, key = null) {
  const i = findElement(arr, e, key)
  arr.splice(i, 1)
}

export function updateElement (arr, e, newVal, key = null) {
  const i = findElement(arr, e, key)
  arr[i] = newVal
}
