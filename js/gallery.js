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

		var purple = 'rgb(33, 59, 93)',
			green = 'rgb(26, 107, 138)',
			black = 'rgb(0,0,0)',
			white = 'rgb(255,255,255)';
		$('body').Geometryangle(
			{
				mesh:{
					ambient: 'rgb(53, 90, 109)',
					diffuse: 'rgb(50,105,105)',
					background: 'rgb(43, 69, 80)',
					fluctuationSpeed: 0.01,
					fluctuationIntensity: 1,
					speed: 0.0003,
				},
				lights: [{
					count: 1,
					gravity: 1000,
					speed: 1,
					dampening: 0.01,
					autopilot: true,
					diffuse: 'rgb(44, 65, 111)',
					ambient: 'rgb(70,70,90)',
					zOffset: 300
				}],
				line: {
					fill: 'rgba(33,59,93,0.5)',
					thickness: 1,
					draw: true
				},
				vertex: {
					draw: false
				}}
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
	document.addEventListener('resize', resize, false);

}(window.cxgallery));
