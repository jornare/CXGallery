window.cxgallery = window.cxgallery || {};

(function(ns){
	"use strict"
	document.addEventListener('DOMContentLoaded', init);
	var carousel = new ns.ImageCarousel(),
		canvas = document.createElement('canvas'),
		background,
		hideGallery = (location.href.indexOf('hidegallery') > 0);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

	
	function init() {
		var elm = document.body,
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		elm.appendChild(carousel.currentImg.img);
		elm.appendChild(carousel.nextImg.img);
		elm.appendChild(canvas);

		hideGallery && carousel.hide();
		carousel.play();
		
		background = new ns.Background(gl);

		renderLoop();
	}
	
	function renderLoop() {
		draw();
		requestAnimationFrame(renderLoop);
	}
	
	function draw(){
		background.draw(canvas);
	}

	


}(window.cxgallery));
