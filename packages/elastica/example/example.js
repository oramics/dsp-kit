var h = require('inferno-hyperscript')
var Inferno = require('inferno')


function App (state) {
  return h('.app', [
    h('h1', 'Elastica example')
  ])
}

var el = document.createElement('div')
document.body.append(el)

Inferno.render(App(), el)
