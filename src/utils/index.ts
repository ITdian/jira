import { useEffect, useState } from 'react';
export const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === ''
}

export const cleanObject = (object: Object) => {
  if (!object) {
    return
  }
  const result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isVoid(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

// const debounce = (fn, delay) => {
//   let timer = null
//   return () => {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn()
//     }, delay)
//   }
// }
// const log = debounce(() => {
//   console.log('this is debounce')
// }, 5000)
// log()
// log()
// log()
// const throttle = (fn, delay) => {
//   let timer = null
//   return () => {
//     if (timer) {
//       return
//     }
//     timer = setTimeout(() => {
//       fn()
//     }, delay)
//   }
// }
// const log = throttle(() => {
//   console.log('this is debounce')
// }, 100)
// log()
// log()
// log()

export const useDebounce = <V> (value: V, delay?: number) => {
  const [debounceValue, setDebounceVal] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounceVal(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}