var FftModuleAsm = require('./fft-asm')
var FftModuleNoAsm = require('./fft-asm-noasm')

module.exports = function FftModule(sz,asm) {
	var i,j,k;
	this.sz=sz;
	this.bufsz=sz*32;
	if(this.bufsz<4096)
		this.bufsz=4096;
	this.heap=new ArrayBuffer(this.bufsz);
	this.foreign=new ArrayBuffer(4096);
	this.flt64=new Float64Array(this.heap);
	if(asm)
		this.fftasm=FftModuleAsm(global,this.foreign,this.heap);
	else
		this.fftasm=FftModuleNoAsm(global,this.foreign,this.heap);
	this.fftasm.setup(sz);
	var t,th=Math.PI;
	for(i=1,j=0;i<sz;i<<=1) {
		t=0.0;
		for(k=0;k<i;++k,j+=2) {
			t+=th;
			this.flt64[sz*2+j]=Math.cos(t);
			this.flt64[sz*2+j+1]=Math.sin(t);
		}
		th*=0.5;
	}
	this.bitrev=new Array(sz);
	this.bitrev[0]=0;
	this.bitrev[sz-1]=sz-1;
	for(j=1,i=0;j<sz-1;++j) {
		for(var k=sz>>1;k>(i^=k);k>>=1)
			;
		this.bitrev[j]=i;
	}
	this.fft=function(real,imag,normalize,asm) {
		var i;
		for(i=0;i<this.sz;++i) {
			this.flt64[this.bitrev[i]]=real[i];
			this.flt64[this.sz+this.bitrev[i]]=imag[i];
		}
		this.fftasm.fft(normalize);
		for(i=0;i<this.sz;++i) {
			real[i]=this.flt64[i];
			imag[i]=this.flt64[this.sz+i];
		}
	}
	this.fftmag=function(real,imag) {
		var i;
		for(i=0;i<this.sz;++i) {
			this.flt64[this.bitrev[i]]=real[i];
			this.flt64[this.sz+this.bitrev[i]]=imag[i];
		}
		this.fftasm.fft(1);
		this.fftasm.mag();
		for(i=0;i<this.sz;++i) {
			real[i]=this.flt64[i];
		}
	}
}
