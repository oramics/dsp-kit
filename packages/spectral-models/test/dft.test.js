/* global describe test expect */
var DFT = require('../src/dft')
var fill = require('filled-array')

const round = (arr, n = 1000) => arr.map(i => Math.floor(i * n) / n)

describe('DFT', () => {
  test('analisys', () => {
    // use a rectangular window (ie. no window)
    var rect = fill(1, 16)
    var dft = new DFT(16, rect)
    var signal = fill((n, N) => Math.sin(2 * Math.PI * n / (N - 1)), 16)
    var result = dft.analisys(signal)
    expect(round(result.magnitudes)).toEqual([
      0, 7.678, 0.753, 0.425, 0.314, 0.26, 0.231, 0.217, 0.212
    ])
    expect(round(result.phases)).toEqual([
      3.141, 1.767, 1.963, -0.982, -3.927, -6.873, -9.818, -12.763, -15.708
    ])
    var synth = dft.synthesis(result)
    expect(round(synth)).toEqual(round(signal))
  })
})
