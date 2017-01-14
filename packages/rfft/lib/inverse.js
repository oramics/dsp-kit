/* eslint-disable one-var */
// input must have ordering as in output of the forward version,
// you can just pass in this.trans and it should work (if you've scaled it)

/**
 * Perform inverse FFT using a real split radix FFT algorithm
 *
 * Code from @Spudd86 (https://github.com/corbanbrook/dsp.js/pull/5)
 */
export default function inverse (bufferSize, buffer, output) {
  var n = bufferSize
  var x = output || new Float64Array(bufferSize)
  var TWO_PI = 2 * Math.PI
  var n2, n4, n8, nn,
    t1, t2, t3, t4, t5,
    j, i0, i1, i2, i3, i4, i5, i6, i7, i8, ix, id,
    st1, cc1, ss1, cc3, ss3,
    e, a

  x.set(buffer)

  nn = n >>> 1
  n2 = n << 1

  while ((nn >>>= 1)) {
    ix = 0
    id = n2
    n2 >>>= 1
    n4 = n2 >>> 2
    n8 = n4 >>> 1

    do { // ix
      for (i0 = ix; i0 < n; i0 += id) {
        i1 = i0
        i2 = i1 + n4
        i3 = i2 + n4
        i4 = i3 + n4

        // sumdiff3(x[i1], x[i3], t1);// {a, b, d} <--| {a+b, b, a-b}
        t1 = x[i1] - x[i3]; x[i1] += x[i3]

        x[i2] += x[i2]
        x[i4] += x[i4]

        // sumdiff3_r(x[i4], t1, x[i3]);// {a,b,d} <--| {a+b, b, b-a}
        x[i3] = t1 - x[i4]; x[i4] += t1

        if (n4 !== 1) {  // note: optimise (Note this comment from original C++)
          i1 += n8
          i2 += n8
          i3 += n8
          i4 += n8

          // sumdiff3(x[i1], x[i2], t1); // {a, b, d} <--| {a+b, b, a-b}
          t1 = x[i1] - x[i2]; x[i1] += x[i2]

          // sumdiff(a, b, &s, &d) {s, d}  <--| {a+b, a-b}
          // sumdiff(x[i4], x[i3], t2, x[i2])
          t2 = x[i4] + x[i3]; x[i2] = x[i4] - x[i3]

          t2 = -t2 * Math.SQRT2
          t1 *= Math.SQRT2
          // sumdiff(a, b, &s, &d) {s, d}  <--| {a+b, a-b}
          // sumdiff(t2, t1, x[i3], x[i4])
          x[i3] = t2 + t1; x[i4] = t2 - t1
        }
      }

      ix = (id << 1) - n2
      id <<= 2
    } while (ix < n)

    e = TWO_PI / n2
    for (j = 1; j < n8; j++) {
      a = j * e

      ss1 = Math.sin(a)
      cc1 = Math.cos(a)

      // ss3 = sin(3 * a); cc3 = cos(3 * a)
      cc3 = 4 * cc1 * (cc1 * cc1 - 0.75)
      ss3 = 4 * ss1 * (0.75 - ss1 * ss1)

      ix = 0
      id = n2 << 1
      do { // ix-loop
        for (i0 = ix; i0 < n; i0 += id) {
          i1 = i0 + j
          i2 = i1 + n4
          i3 = i2 + n4
          i4 = i3 + n4

          i5 = i0 + n4 - j
          i6 = i5 + n4
          i7 = i6 + n4
          i8 = i7 + n4

          // sumdiff3(x[i1], x[i6], t1); // {a, b, d} <--| {a+b, b, a-b}
          t1 = x[i1] - x[i6]; x[i1] += x[i6]
          // sumdiff3(x[i5], x[i2], t2); // {a, b, d} <--| {a+b, b, a-b}
          t2 = x[i5] - x[i2]; x[i5] += x[i2]
          // t2 = x[i5] + x[i2]; x[i5] = x[i5] - x[i2]

          // sumdiff(a, b, &s, &d) {s, d}  <--| {a+b, a-b}
          // sumdiff(x[i8], x[i3], t3, x[i6])
          // sumdiff(x[i4], x[i7], t4, x[i2])
          t3 = x[i8] + x[i3]; x[i6] = x[i8] - x[i3]
          t4 = x[i4] + x[i7]; x[i2] = x[i4] - x[i7]

          // sumdiff3(t1, t4, t5); // {a, b, d} <--| {a+b, b, a-b}
          t5 = t1 - t4; t1 += t4
          // sumdiff3(t2, t3, t4); // {a, b, d} <--| {a+b, b, a-b}
          t4 = t2 - t3; t2 += t3

          // cmult(c, s, x, y, &u, &v) {u,v} <--| {x*c-y*s, x*s+y*c}
          // cmult(ss1, cc1, t5, t4, x[i7], x[i3])
          // cmult(cc3, ss3, t1, t2, x[i4], x[i8])
          x[i7] = t5 * ss1 - t4 * cc1; x[i3] = t5 * cc1 + t4 * ss1
          x[i4] = t1 * cc3 - t2 * ss3; x[i8] = t1 * ss3 + t2 * cc3
        }

        ix = (id << 1) - n2
        id <<= 2
      } while (ix < n)
    }
  }

  for (ix = 0, id = 4; ix < n; id *= 4) {
    for (i0 = ix; i0 < n; i0 += id) {
      //  sumdiff(&a, &b) {a, b}  <--| {a+b, a-b}
      // sumdiff(x[i0], x[i0+1])
      st1 = x[i0] - x[i0 + 1]
      x[i0] += x[i0 + 1]
      x[i0 + 1] = st1
    }
    ix = 2 * (id - 1)
  }

  reverseBinPermuteInPlace(bufferSize, x)
  return x
}

// don't use a lookup table to do the permute, use this instead
// the inverse transform needs to do this in place so we have this
function reverseBinPermuteInPlace (bufferSize, buf) {
  var halfSize = bufferSize >>> 1
  var nm1 = bufferSize - 1
  var i = 1, r = 0, h, t

  do {
    r += halfSize
    t = buf[i]
    buf[i] = buf[r]
    buf[r] = t

    i++

    h = halfSize << 1
    while (h = h >> 1, !((r ^= h) & h)) ;

    if (r >= i) {
      t = buf[i]
      buf[i] = buf[r]
      buf[r] = t
      t = buf[nm1 - i]
      buf[nm1 - i] = buf[nm1 - r]
      buf[nm1 - r] = t
    }
    i++
  } while (i < halfSize)
}
