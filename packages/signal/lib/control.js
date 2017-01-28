
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
