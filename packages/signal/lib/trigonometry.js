import { val } from './core'

/**
 * Returns the arcosine (in radians) of a number
 * @param {Signal|Number} number
 * @return {Signal}
 */
export const acos = (number) => () => Math.acos(val(number))

/**
 * Returns the arcsine (in radians) of a number
 * @param {Signal|Number} number
 * @return {Signal}
 */
export const asin = (number) => () => Math.asin(val(number))

/**
 * Returns the arctangent (in radians) of a number
 * @param {Signal|Number} number
 * @return {Signal}
 */
export const atan = (number) => () => Math.atan(val(number))

/**
 * Returns the cosine of the input (interpreted as radians)
 * @param {Signal|Number} radians
 * @return {Signal}
 */
export const cos = (radians) => () => Math.cos(val(radians))

/**
 * Returns the sine of the input (interpreted as radians)
 * @param {Signal|Number} radians
 * @return {Signal}
 */
export const sin = (radians) => () => Math.sin(val(radians))

/**
 * Returns the tangent of the input (interpreted as radians)
 * @param {Signal|Number} radians
 * @return {Signal}
 */
export const tan = (radians) => () => Math.tan(val(radians))
