module.exports = function (canvas, data, color, maxStep = 1000) {
  var ctx = canvas.getContext('2d')
  if (color) ctx.fillStyle = color
  var width = canvas.width
  var height = canvas.height
  var step = Math.ceil(data.length / width)
  var amp = height / 2
  for (var i = 0; i < width; i++) {
    var neg = 0
    var pos = 0
    var max = Math.min(step, maxStep)
    for (var j = 0; j < max; j++) {
      var val = data[(i * step) + j]
      if (val < 0) neg += val
      else pos += val
    }
    neg = neg / max
    pos = pos / max
    ctx.fillRect(i, amp - pos * amp, 1, amp * (pos - neg))
  }
  canvas.waveData = data
  return canvas
}
