let taskTypeData

export function init (data) {
  taskTypeData = data
}

const getNameByNumber = (id) => {

}

const getNameByArray = (idArr) => {
  const nameArr = []
  let idPointer = 0

  function find (arr) {
    for (const e of arr) {
      if (e.id === idArr[idPointer]) {
        nameArr.push(e.name)
        idPointer++
        find(e.children)
        return
      }
    }
  }

  find(taskTypeData.children)
  return nameArr
}

export function getTaskTypeRootName (type) {
  return type
}

export function getTaskTypeFullNameArray (type) {
  if ((typeof type) === 'number') {
    return getNameByNumber(type)
  } else {
    return getNameByArray(type)
  }
}

const separator = ' > '
export function getTaskTypeFullName (type) {
  let fullName = ''
  const arr = getTaskTypeFullNameArray(type)
  for (let i = 0; i < arr.length - 1; i++) {
    fullName = fullName.concat(arr[i], separator)
  }
  fullName = fullName.concat(arr[arr.length - 1])
  return fullName
}
