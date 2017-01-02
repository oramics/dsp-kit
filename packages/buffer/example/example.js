var draw = require('draw-waveform')
var addCanvas = require('add-canvas')
var buffer = require('..')

var constant = buffer.generate(600, (x) => 1)
draw(addCanvas(600), constant)

var sine = buffer.generate(600, (n, N) => Math.sin(10 * 2 * Math.PI * n / (N - 1)))
draw(addCanvas(600), sine)

const hamming = () => (n, N) => 0.54 - 0.46 * Math.cos(2 * Math.PI * n / (N - 1))
var window = buffer.generate(600, hamming())
draw(addCanvas(600), window)

var mult = buffer.mult(constant, window)
draw(addCanvas(600), mult)

var dest = buffer.zeros(1200)
buffer.copy(window, dest)
buffer.add(window, dest, dest, 0, 300, 300)
buffer.add(window, dest, dest, 0, 600, 600)
draw(addCanvas(600), dest)
