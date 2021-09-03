import { useEffect, useState } from "react";
export const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === "";
};

export const cleanObject = (object: { [key: string]: unknown }) => {
  if (!object) {
    return;
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环, 这个和useCallback 以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

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

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceVal] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceVal(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};
