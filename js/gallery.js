window.cxgallery = window.cxgallery || {};

(function(ns){
	"use strict"

	var interval = parseInt(getQueryParam('interval')) || 0,
		path = getQueryParam('path') || 'gallery/',
		carousel = new ns.ImageCarousel(path),
		canvas = document.createElement('canvas'),
		background,
		hideGallery = (location.href.indexOf('hidegallery') > 0);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

	
	function init() {
		var elm = document.body,
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		elm.appendChild(carousel.container);
		elm.appendChild(canvas);

		hideGallery && carousel.hide();
		carousel.play(interval);
		
		background = new ns.Background(gl);

		var purple = 'rgb(46, 51, 137)',
			green = 'rgb(26, 107, 138)',
			black = 'rgb(0,0,0)',
			white = 'rgb(255,255,255)';
		$('body').Geometryangle(
			{
				mesh:{
					ambient: purple,
					diffuse: green,
					background: 'rgb(0, 0, 0)'
				},
				lights: [{
					gravity: 100,
					speed: 0.001,
					dampening: 0.01,
					autopilot: true,
					//diffuse: black,
					//ambient: white,
					zOffset: 200
				}],
				line: {
					thickness: 5
				},
				vertex: {}}
			);		
		//renderLoop();
	}
	
	function getQueryParam(q) {
        var a = location.search.substr(1).split('&'),
			b,
			i;
        for (i = 0; i < a.length; i++) {
            b = a[i].split('=');
			if(b[0]==q) {
				return decodeURIComponent(b[1]);
			}
        }
        return '';
    }
	
	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	
	function renderLoop() {
		draw();
		requestAnimationFrame(renderLoop);
	}
	
	function draw(){
		background.draw(canvas);
	}

	
	document.addEventListener('DOMContentLoaded', init, false);
	window.addEventListener('resize', resize, false);

}(window.cxgallery));
