//
//FFT Module without "use asm" for comparison
//
module.exports = function FftModuleNoAsm(stdlib, foreign, heap) {
	//"use asm";
	var FLOAT64 = new stdlib.Float64Array(heap);
	var sqrt=stdlib.Math.sqrt;
	var sz=0;
	function setup(n) {
		n=n|0;
		sz=n;
	}
	function fft(normalize) {
		normalize=normalize|0;
		var m=0, mh=0, i=0, j=0, k=0;
		var wr=0.0, wi=0.0, xr=0.0, xi=0.0, w=0.0, r=0.0;
		var tcnt=0;
		for(mh=1;(m=mh<<1)<=(sz|0);mh=m) {
			for(i=0;(i|0)<(mh|0);i=(i+1)|0) {
				wr=+FLOAT64[(sz*16+tcnt)>>3];
				wi=+FLOAT64[(sz*16+tcnt+8)>>3];
				tcnt=(tcnt+16)|0;
				for(j=i;(j|0)<(sz|0);j=(j+m)|0) {
					k=(j+mh)|0;
					xr=wr*FLOAT64[k<<3>>3]-wi*FLOAT64[(sz+k)<<3>>3];
					xi=wr*FLOAT64[(sz+k)<<3>>3]+wi*FLOAT64[k<<3>>3];
					FLOAT64[k<<3>>3] = +FLOAT64[j<<3>>3]-xr;
					FLOAT64[(sz+k)<<3>>3] = +FLOAT64[(sz+j)<<3>>3]-xi;
					FLOAT64[j<<3>>3] = +FLOAT64[j<<3>>3] + xr;
					FLOAT64[(sz+j)<<3>>3] = +FLOAT64[(sz+j)<<3>>3] + xi;
				}
			}
		}
		if(normalize) {
			r = +(1.0/+(sz|0));
			for(i=0;(i|0)<(sz|0);i=(i+1)|0) {
				FLOAT64[i<<3>>3]=+FLOAT64[i<<3>>3]*r;
				FLOAT64[(sz+i)<<3>>3]=+FLOAT64[(sz+i)<<3>>3]*r;
			}
		}
	}
	function mag() {
		var i=0,j=0;
		for(i=0;(i|0)<(sz|0);i=(i+1)|0) {
			j=(sz*2-i-1)|0;
			FLOAT64[i<<3>>3]=sqrt(FLOAT64[i<<3>>3]*FLOAT64[i<<3>>3]+FLOAT64[j<<3>>3]*FLOAT64[j<<3>>3]);
		}
	}
	return {
		setup:setup,
		fft:fft,
		mag:mag
	};
}
