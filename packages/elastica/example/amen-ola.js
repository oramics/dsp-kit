var { print, addCanvas } = require('exemplary')
var h = require('h')
var ac = require('audio-context')
var draw = require('draw-waveform')
var elastica = require('..')

print('Amen break with OLA timestretch', 'h1')
console.log(elastica)

fetch('example/amen-mono.wav').then(function (response) {
  return response.arrayBuffer()
}).then(decodeArrayBuffer(ac))
.then(function (buffer) {
  console.log(buffer)
  draw(addCanvas(600), buffer.getChannelData(0))
  link('Play', player(buffer))
  document.body.appendChild(
    h('div',
      h('input', {
      type: 'range', min: 0.2, max: 2.5, step: 0.1, value: 1.2,
      change: function(e) {
        var val = e.target.value
        document.getElementById('factor').innerText = val
        performStretch(val)
      }}),
      h('span', 'Stretch factor: '),
      h('span#factor', '1.2')
    )
  )
  var canvas = addCanvas(600)
  function performStretch(factor) {
    console.time('ola')
    var result = elastica.stretch(1.2, buffer)
    console.timeEnd('ola')
    draw(canvas, buffer.getChannelData(0))
    link('Play', player(result))
  }
})

function player (buffer) {
  var player = null
  return function (e, el) {
    if (player) {
      player.stop()
      player = null
      el.innerText = 'Play'
    } else {
      el.innerText = 'Stop'
      player = play(buffer, true)
    }
  }
}

function play (buffer, loop) {
  var source = ac.createBufferSource()
  source.buffer = buffer
  source.connect(ac.destination)
  if (loop === true) source.loop = true
  source.start()
  return source
}

function decodeArrayBuffer (context) {
  context = context || ac
  return function (response) {
    const next = typeof response.arrayBuffer === 'function'
      ? response.arrayBuffer() : Promise.resolve(response)

    return next.then(arrayBuffer => new Promise(function (resolve, reject) {
      context.decodeAudioData(arrayBuffer, resolve, reject)
    }))
  }
}

function link (text, fn, parent) {
  parent = parent || document.body

  var el = document.createElement('a')
  el.href = '#'
  el.innerText = text
  el.onclick = function (e) {
    e.preventDefault()
    fn(e, el)
  }
  parent.append(el)
  return el
}
