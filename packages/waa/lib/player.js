var ac = require('audio-context')

module.exports = function player (buffer, loop, context) {
  var player = null
  return function (e, el) {
    if (player) {
      console.log('stop')
      player.stop()
      player = null
      if (el) el.innerText = 'Play'
    } else {
      console.log('playing...')
      if (el) el.innerText = 'Stop'
      player = play(buffer, loop, context)
    }
  }
}

function play (buffer, loop, context = ac) {
  var source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  if (loop === true) source.loop = true
  source.start()
  return source
}
