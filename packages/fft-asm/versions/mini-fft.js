/* eslint-disable semi */
/**
 * https://gist.github.com/antimatter15/0349ca7d479236fdcdbb
 * IT WORKS!
 * @module fft-asm
 */
var sin = Math.sin
var cos = Math.cos

export function fft (real, imag, dir) {
  dir = dir || 'forward'
  var n = real.length
  if (imag.length !== n) throw Error('Real and imag parts should have same size, but was ' + n + ' and ' + imag.length)
  var m = Math.log(n) / Math.log(2)
  process(real, imag, n, m, dir)
}

function process (re, im, N) {
  var c, s, tre, tim
  for (var i = 0; i < N; i++) {
    for (var j = 0, h = i, k = N; (k >>= 1); h >>= 1) {
      j = (j << 1) | (h & 1);
    }
    if (j > i) {
      re[j] = [re[i], re[i] = re[j]][0]
      im[j] = [im[i], im[i] = im[j]][0]
    }
  }
  for (var hN = 1; hN * 2 <= N; hN *= 2) {
    for (i = 0; i < N; i += hN * 2) {
      for (j = i; j < i + hN; j++) {
        c = cos(Math.PI * (j - i) / hN)
        s = sin(Math.PI * (j - i) / hN)
        tre = re[j + hN] * c + im[j + hN] * s;
        tim = -re[j + hN] * s + im[j + hN] * c;
        re[j + hN] = re[j] - tre; im[j + hN] = im[j] - tim;
        re[j] += tre; im[j] += tim;
      }
    }
  }
}
