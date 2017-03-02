var ac = require('audio-context')

/**
 * A play function to be attached to a dom element
 *
 * @name player
 * @function
 * @memberof module:dsp-waa
 * @example
 * document.getElementById('#play').onclick = player(buffer, { loop: true })
 */
module.exports = function player ({
  buffer,
  loop = false,
  context = ac,
  labels = ['Play', 'Stop'],
  gain = false
} = {}) {
  function player (e) {
    if (player.source) {
      player.source.stop()
      player.source = null
      if (e && labels) e.target.innerText = labels[0]
    } else {
      if (e && labels) e.target.innerText = labels[1]
      player.source = play(player.buffer, loop, gain, context)
    }
  }
  player.buffer = buffer
  return player
}

function play (buffer, loop, gain, context) {
  var source = context.createBufferSource()
  source.buffer = buffer
  if (loop === true) source.loop = true

  if (gain) {
    var g = context.createGain()
    g.gain.value = gain
    g.connect(context.destination)
    source.connect(g)
  } else {
    source.connect(context.destination)
  }

  source.start()
  return source
}
