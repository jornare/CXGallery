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
		setupFileDrop();
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


	function setupFileDrop(){
		//file upload
		function handleFileSelect(evt) {
			evt.stopPropagation();
			evt.preventDefault();
		
			var files = evt.dataTransfer.files; // FileList object.
		
			// files is a FileList of File objects. List some properties.
			var output = [];
			for (var i = 0, f; f = files[i]; i++) {

				console.log(f);
				// Only process image files.
				if (!f.type.match('image.*')) {
					continue;
				}
				carousel.addImageFile(f);

			/*output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
						f.size, ' bytes, last modified: ',
						f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
						'</li>');*/
			}
			
			//document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
		}
		
		function handleDragOver(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		}
		
		// Setup the dnd listeners.
		var dropZone = document.body;
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
	
		
	}


}(window.cxgallery));
