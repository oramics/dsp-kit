var ac = require('audio-context')

module.exports = function toAudioBuffer (left, right, context) {
  var len = left.length
  context = context || ac
  var buffer = ac.createBuffer(1, len, context.sampleRate)
  var data = buffer.getChannelData(0)
  for (var i = 0; i < len; i++) {
    data[i] = left[i]
  }
  return buffer
}
