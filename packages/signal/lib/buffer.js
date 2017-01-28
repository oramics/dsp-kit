/**
 * @module buffer
 */

/**
 * @name data
 * @function
 * memberof module:buffer
 */
export const data = (data) => () => data

export function loop (data) {
  const len = data.length
  let index = 0
  return function () {
    const val = data[index]
    index = (index + 1) % len
    return val
  }
}

export const peek = (data, index, opts) => {
  return () => {
    const val = data[index]
    index++
    return val
  }
}
