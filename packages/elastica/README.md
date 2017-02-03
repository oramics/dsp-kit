<a name="module_elastica"></a>

## elastica
> timestretch audio in the browser

It bridges the web audio api (audio buffers, audio workers) with the
timestretch functions of dsp-kit

Will be published as an independent module

<a name="module_elastica..stretch"></a>

### elastica~stretch(factor, buffer, [options]) ⇒ <code>AudioBuffer</code>
Perform time-stretch to an audio buffer

**Kind**: inner method of <code>[elastica](#module_elastica)</code>  
**Returns**: <code>AudioBuffer</code> - a new audio buffer  

| Param | Type | Description |
| --- | --- | --- |
| factor | <code>Number</code> | the stretch factor (< 1 reduce duration, > 1 expand duration) |
| buffer | <code>AudioBuffer</code> | a WebAudio's AudioBuffer |
| [options] | <code>Object</code> | An optional object with configuration: - {String} algorithm = 'phase-vocoder': the algorithm to be use. Valid values are: 'phase-vocoder', 'ola', 'paul-stretch'. Default: 'phase-vocoder' - {Integer} size = 4096: the frame size - {Integer} hop = 1024: the hop size - {AudioContext} context: the audio context to use (or use 'audio-context' npm package) |

