var ac = require('audio-context')

module.exports = function decodeArrayBuffer (context) {
  context = context || ac
  return function (response) {
    const next = typeof response.arrayBuffer === 'function'
      ? response.arrayBuffer() : Promise.resolve(response)

    return next.then(arrayBuffer => new Promise(function (resolve, reject) {
      context.decodeAudioData(arrayBuffer, resolve, reject)
    }))
  }
}
