/* global fetch */
var { app, html } = require('hyperapp')
var elastica = require('..')
var waa = require('dsp-waa')

var srcPlayer = waa.player({ loop: true, gain: 0.2 })
var olaPlayer = waa.player({ loop: true, gain: 0.2 })

function draw (canvas, buffer) {
  console.log('draw', canvas, buffer)
  waa.drawWaveform(canvas, buffer.getChannelData(0), '#0cc')
}

const Source = (model, msg) => html`
  <div>
    <h2>Source</h2>
    <div><label>Duration:</label>${model.duration}</div>
    <canvas onupdate=${(e) => draw(e, model.buffer)} width="600" height="150"></canvas>
    <a href="#!" onclick=${msg.playSource}>Play!</a>
  </div>
`

const Overlap = (model, msg) => html`
  <div>
    <h2>Overlap</h2>
    <div><label>Duration:</label>${model.duration}</div>
    <canvas oncreate=${(e) => draw(e, model.buffer)} width="600" height="150"></canvas>
    <a href="#!" onclick=${msg.playOla}>Play!</a>
  </div>
`

const view = (model, msg) => html`
  <div>
    <h1>Elastica demo</h1>
    ${model.source ? Source(model.source, msg) : 'loading...'}
    ${model.ola ? Overlap(model.ola, msg) : 'waiting for data...'}
  </div>
`

const model = { duration: 0 }

const update = {
  loadSource: (model, buffer) => ({
    source: { buffer: buffer, duration: buffer.length / 44100 }
  }),
  performOla: (model, buffer) => ({
    source: model.source,
    ola: { buffer, duration: buffer.length / 44100 }
  })
}

const effects = {
  playSource: (model, msg, e) => srcPlayer(e),
  playOla: (model, msg, e) => olaPlayer(e)
}

const subs = [
  (_, msg) => fetch('example/amen-mono.wav')
    .then(waa.decodeArrayBuffer())
    .then(buffer => {
      console.log('LOAD', buffer)
      srcPlayer.buffer = buffer
      msg.loadSource(buffer)
      return buffer
    })
    .then(buffer => {
      var bufferOLA = elastica.stretch(1, buffer, { algorithm: 'ola' })
      olaPlayer.buffer = bufferOLA
      msg.performOla(bufferOLA)
    })
]

const hooks = {
  onAction: (prev, next, data) => console.log('ACTION', prev, next, data)
}

app({ view, model, subs, update, effects, hooks })
