export default function reverseBinPermute (bufferSize, dest, source) {
  var halfSize = bufferSize >>> 1
  var nm1 = bufferSize - 1
  var i = 1
  var r = 0
  var h

  dest[0] = source[0]

  do {
    r += halfSize
    dest[i] = source[r]
    dest[r] = source[i]

    i++

    h = halfSize << 1
    while (h = h >> 1, !((r ^= h) & h)) ;

    if (r >= i) {
      dest[i] = source[r]
      dest[r] = source[i]

      dest[nm1 - i] = source[nm1 - r]
      dest[nm1 - r] = source[nm1 - i]
    }
    i++
  } while (i < halfSize)
  dest[nm1] = source[nm1]
}
