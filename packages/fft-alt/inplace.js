/**
 in-place complex fft

 After Cooley, Lewis, and Welch; from Rabiner & Gold (1975)

 program adapted from FORTRAN
 by K. Steiglitz  (ken@princeton.edu)
 Computer Science Dept.
 Princeton University 08544
 */
var cos = Math.cos
var sin = Math.sin
var M_PI = Math.PI

module.exports = function fft (N, ar, ai) {
  var i, j, k, L /* indexes */
  var M, TEMP, LE, LE1, ip /* M = log N */
  var NV2, NM1
  var t /* temp */
  var Ur, Ui, Wr, Wi, Tr, Ti, UrOld

  // if ((N > 1) && !(N & (N - 1)))   // make sure we have a power of 2
  NV2 = N >> 1
  NM1 = N - 1
  TEMP = N /* get M = log N */
  M = 0

  while ((TEMP = TEMP >> 1)) {
    ++M
  }
  /* shuffle */
  j = 1
  for (i = 1; i <= NM1; i++) {
    if (i < j) {             /* swap a[i] and a[j] */
      t = ar[j - 1]
      ar[j - 1] = ar[i - 1]
      ar[i - 1] = t
      t = ai[j - 1]
      ai[j - 1] = ai[i - 1]
      ai[i - 1] = t
    }
    k = NV2 /* bit-reversed counter */
    while (k < j) {
      j -= k
      k /= 2
    }
    j += k
  }
  LE = 1
  for (L = 1; L <= M; L++) {            // stage L
    LE1 = LE                         // (LE1 = LE/2)
    LE *= 2                          // (LE = 2^L)
    Ur = 1.0
    Ui = 0.0
    Wr = cos(M_PI / LE1)
    Wi = -sin(M_PI / LE1) // Cooley, Lewis, and Welch have "+" here
    for (j = 1; j <= LE1; j++) {
      for (i = j; i <= N; i += LE) { // butterfly
        ip = i + LE1
        Tr = ar[ip - 1] * Ur - ai[ip - 1] * Ui
        Ti = ar[ip - 1] * Ui + ai[ip - 1] * Ur
        ar[ip - 1] = ar[i - 1] - Tr
        ai[ip - 1] = ai[i - 1] - Ti
        ar[i - 1] = ar[i - 1] + Tr
        ai[i - 1] = ai[i - 1] + Ti
      }
      UrOld = Ur
      Ur = UrOld * Wr - Ui * Wi
      Ui = UrOld * Wi + Ui * Wr
    }
  }
}
