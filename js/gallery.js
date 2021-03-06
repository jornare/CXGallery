window.cxgallery = window.cxgallery || {};

(function(ns){
	"use strict"

	var interval = parseInt(getQueryParam('interval')) || 0,
		templateName = getQueryParam('template') || 'turquois',
		path = getQueryParam('path') || 'gallery/',
		carousel = new ns.ImageCarousel(path),
		canvas = document.createElement('canvas'),
		hideGallery = (location.href.indexOf('hidegallery') > 0);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

	
	function init() {
		var elm = document.body;
		setupFileDrop();
		elm.appendChild(carousel.container);
		elm.appendChild(canvas);

		hideGallery && carousel.hide();
		carousel.play(interval);

		var deepblue = 'rgb(43, 69, 80)',
			darkturquois = 'rgb(33, 59, 93)',
			black = 'rgb(0,0,0)',
			white = 'rgb(255,255,255)',
			darkpurple = 'rgb(85, 30, 70)',
			puprle = 'rgba(85, 30, 70, 0.5)',
			turquoisLine = 'rgba(33,59,93,0.5)';

		var meshSpeed = 0.0001;
			
		var template = {
			purple: {
				mesh:{
					ambient: 'rgb(46, 51, 137)',
					diffuse: 'rgb(26, 107, 138)',
					background: darkpurple,
					fluctuationSpeed: 0.01,
					fluctuationIntensity: 1,
					speed: meshSpeed,
				},
				lights: [{
					gravity: 100,
					speed: 0.001,
					dampening: 0.01,
					autopilot: true,
					zOffset: 200
				}],
				line: {
					fill: puprle,
					thickness: 1,
					draw: true
				},
				vertex: {
					draw: false
				}
			},
			turquois: {
				mesh:{
					ambient: 'rgb(53, 90, 109)',
					diffuse: 'rgb(50, 105, 105)',
					background: deepblue,
					fluctuationSpeed: 0.01,
					fluctuationIntensity: 1,
					speed: meshSpeed,
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
					fill: turquoisLine,
					thickness: 1,
					draw: true
				},
				vertex: {
					draw: false
				}
			}
		};


		$('body').Geometryangle(template[templateName]);		
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
	
	document.addEventListener('DOMContentLoaded', init, false);
	window.addEventListener('resize', resize, false);


	function setupFileDrop(){
		//file upload
		function handleFileSelect(evt) {
			var i, f, files = [];
			evt.stopPropagation();
			evt.preventDefault();

			// files is a FileList of File objects. Convert it to array
			for (i = 0; evt.dataTransfer.files[i]; i++) {
				files.push(evt.dataTransfer.files[i]);
			}
			files = files.sort(function(a, b) {
				var a1 = a.name.split(' '), b1 = b.name.split(' ');
				return parseInt(a1[0]) - parseInt(b1[0]);
			});
			
			for (i = 0; f = files[i]; i++) {
				// Only process image files.
				if (!f.type.match('image.*')) {
					continue;
				}
				carousel.addImageFile(f);
			}
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
