# asm.js FFT module


---
## Usage

#### Creating FftModule
`var fftasm = new FftModule(num fftsize, boolean enable-asm);` 

- Codes are compiled in this phase.  

#### Execute FFT
`fftasm.fft(Array real, Array imag, boolean normalize);`  

- here the real/imag are input data (Array or TypedArray)  
- real/imag array size should be matched to [fftsize].
- real/imag will be overwritten with the results.


#### Execute FFT & get magnitude
`fftasm.fftmag(Array real, Array imag);`

- here the real/imag are input data (Array or TypedArray)  
- the result will be placed to [real] array.

#### Test page is available on [http://www.g200kg.com/docs/asmjs/asmjstest.html](http://www.g200kg.com/docs/asmjs/asmjstest.html)

---
Distributed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
