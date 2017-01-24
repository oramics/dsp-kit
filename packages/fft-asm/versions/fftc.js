/* eslint-disable semi */
/**
 * fft.c
 * Douglas L. Jones
 * University of Illinois at Urbana-Champaign
 * January 19, 1992
 * http://cnx.rice.edu/content/m12016/latest/
 *
 *   fft: in-place radix-2 DIT DFT of a complex input
 *
 *   input:
 * n: length of FFT: must be a power of two
 * m: n = 2**m
 *   input/output
 * x: double array of length n with real part of data
 * y: double array of length n with imag part of data
 *
 *   Permission to copy and use this program is granted
 *   as long as this header is included.
 *
 * @module fft-asm
 */
var sin = Math.sin
var cos = Math.cos

export function fft (real, imag, dir) {
  dir = dir || 'forward'
  var n = real.length
  if (imag.length !== n) throw Error('Real and imag parts should have same size, but was ' + n + ' and ' + imag.length)
  var m = Math.log(n) / Math.log(2)
  compute(real, imag, n, m, dir)
}

function compute (x, y, n, m) {
  var i = 0, j = 0, k = 0, n1 = 0, n2 = 0, a = 0;
  var c = 0, s = 0, t1 = 0, t2 = 0;

  // Bit-reverse
  j = 0;
  n2 = n / 2;
  for (i = 1; i < n - 1; i++) {
    n1 = n2;
    while (j >= n1) {
      j = j - n1;
      n1 = n1 / 2;
    }
    j = j + n1;

    if (i < j) {
      t1 = x[i];
      x[i] = x[j];
      x[j] = t1;
      t1 = y[i];
      y[i] = y[j];
      y[j] = t1;
    }
  }

  // FFT
  n1 = 0;
  n2 = 1;

  for (i = 0; i < m; i++) {
    n1 = n2;
    n2 = n2 + n2;
    a = 0;

    for (j = 0; j < n1; j++) {
      c = cos(a);
      s = sin(a);
      a += 1 << (m - i - 1);
      for (k = j; k < n; k = k + n2) {
        t1 = c * x[k + n1] - s * y[k + n1];
        t2 = s * x[k + n1] + c * y[k + n1];
        x[k + n1] = x[k] - t1;
        y[k + n1] = y[k] - t2;
        x[k] = x[k] + t1;
        y[k] = y[k] + t2;
      }
    }
  }
}
