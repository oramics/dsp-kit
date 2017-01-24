/**
* This module is a port of [arduinoFFT](https://github.com/kosme/arduinoFFT/)
* source from C++ to Javascript
*
* Copyright (C) 2010 Didier Longueville
* Copyright (C) 2014 Enrique Condes
* Javascript version by danigb
*
* @module fft-asm
*/
var sqrt = Math.sqrt

export function fft (real, imag, dir) {
  dir = dir || 'forward'
  var len = real.length
  if (imag.length !== len) throw Error('Real and imag parts should have same size, but was ' + len + ' and ' + imag.length)
  var power = exponent(len)
  compute(real, imag, len, power, dir)
}

// Computes the exponent of a powered 2 value
function exponent (value) {
  var result = 0
  while (((value >> result) & 1) !== 1) result++
  return result
}

function compute (real, imag, samples, power, dir) {
  /* Computes in-place complex-to-complex FFT */
  /* Reverse bits */
  var j = 0
  for (var i = 0; i < (samples - 1); i++) {
    if (i < j) {
      swap(real[i], real[j])
      swap(imag[i], imag[j])
    }
    var k = (samples >> 1)
    while (k <= j) {
      j -= k
      k >>= 1
    }
    j += k
  }
  /* Compute the FFT  */
  var c1 = -1.0
  var c2 = 0.0
  var l2 = 1
  for (var l = 0; (l < power); l++) {
    var l1 = l2
    l2 <<= 1
    var u1 = 1.0
    var u2 = 0.0
    for (j = 0; j < l1; j++) {
      for (i = j; i < samples; i += l2) {
        var i1 = i + l1
        var t1 = u1 * real[i1] - u2 * imag[i1]
        var t2 = u1 * imag[i1] + u2 * real[i1]
        real[i1] = real[i] - t1
        imag[i1] = imag[i] - t2
        real[i] += t1
        imag[i] += t2
      }
      var z = ((u1 * c1) - (u2 * c2))
      u2 = ((u1 * c2) + (u2 * c1))
      u1 = z
    }
    c2 = sqrt((1.0 - c1) / 2.0)
    if (dir !== 'inverse') {
      c2 = -c2
    }
    c1 = sqrt((1.0 + c1) / 2.0)
  }
  /* Scaling for reverse transform */
  if (dir === 'inverse') {
    for (i = 0; i < samples; i++) {
      real[i] /= samples
      imag[i] /= samples
    }
  }
}

function swap (x, y) {
  var temp = x
  x = y
  y = temp
}
