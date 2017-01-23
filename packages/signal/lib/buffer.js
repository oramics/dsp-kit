/**
 * @module buffer
 */

/**
 * @name data
 * @function
 * memberof module:buffer
 */
export const data = (data) => () => data

export const peek = (data, index, opts) => {
  return () => {
    const val = data[index]
    index++
    return val
  }
}
