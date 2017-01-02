const draw = require('draw-waveform')
const addCanvas = require('add-canvas')
const buffer = require('dsp-buffer')
const ola = require('..').overlapAdd

print('Add and overlap examples', 'h3')

print('Example signal: a constant')
const constant = buffer.generate(400, (x) => 0.5)
draw(addCanvas(400), constant)

print('Stretch to double, with hop size factor 0.5')
var stretch = ola({ size: 20, hop: 10 })
const doubled = stretch(2, constant)
console.log('double', doubled.length)
draw(addCanvas(800), doubled)

print('Stretch to half')
const half = stretch(0.5, constant)
console.log('half', half.length)
draw(addCanvas(200), half)

function print (text, tag = 'p', parent = document.body) {
  var el = document.createElement(tag)
  el.innerText = text
  parent.append(el)
  return el
}
