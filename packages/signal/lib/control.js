import { val } from './core'

export function bang () {
  let value = 0
  const gen = function () {
    if (value === 0) return 0
    value = 0
    return 1
  }
  gen.trigger = function () {
    value = 1
  }
  return gen
}

export function ifelse (cond, trueSt, falseSt) {
  return function () {
    return val(cond) ? val(trueSt) : val(falseSt)
  }
}
