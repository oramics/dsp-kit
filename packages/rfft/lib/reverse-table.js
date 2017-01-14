export default function generateReverseTable (bufferSize) {
  var reverseTable = new Uint32Array(bufferSize)
  var halfSize = bufferSize >>> 1
  var nm1 = bufferSize - 1
  var i = 1
  var r = 0
  var h

  reverseTable[0] = 0

  do {
    r += halfSize

    reverseTable[i] = r
    reverseTable[r] = i

    i++

    h = halfSize << 1
    while (h = h >> 1, !((r ^= h) & h)) ;

    if (r >= i) {
      reverseTable[i] = r
      reverseTable[r] = i

      reverseTable[nm1 - i] = nm1 - r
      reverseTable[nm1 - r] = nm1 - i
    }
    i++
  } while (i < halfSize)

  reverseTable[nm1] = nm1
  return reverseTable
}
