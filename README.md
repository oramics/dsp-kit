# dsp-kit

> A digital signal processing library in Javascript

Since I usually learn by coding, this is the result of my learning on dsp.

Work in progress. Not published yet.

This is a [multimodule](https://github.com/lerna/lerna) repository.

```js
const dsp = require('dsp-kit')
const signal = dsp.buffer.generate(1024, (x) => Math.sin(x))
const spectrum = dsp.spectrum(dsp.fft.forward(signal))
```

## Documentation

Read the [generated API documentation](https://github.com/oramics/dsp-kit/blob/master/docs/README.md)

## References

- [Circles, sines and signals](jackschaedler.github.io/circles-sines-signals/) by Jack Schaedler
- [Digital signal processing for music applications](https://www.coursera.org/learn/audio-signal-processing) course in coursera.
- [Understanding Digital Signal](https://www.amazon.com/Understanding-Digital-Signal-Processing-3rd/dp/0137027419) by Richard G. Lyons.
