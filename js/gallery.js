window.cxgallery = window.cxgallery || {};

(function(ns){
	document.addEventListener('DOMContentLoaded', init);
	var carousel = new ns.ImageCarousel(),
		currentImg = carousel.getCurrentImage(),
		canvas = document.createElement('canvas'),
		background;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	
	function init() {
		var elm = document.body,
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		elm.appendChild(carousel.currentImg.img);
		elm.appendChild(carousel.nextImg.img);
		elm.appendChild(canvas);

		
		background = new ns.Background(gl);
		setInterval(changeImage, 5000);
		renderLoop();
	}
	
	function renderLoop() {
		draw();
		requestAnimationFrame(renderLoop);
	}
	
	function draw(){
		background.draw(canvas);
	}
	
	
	function changeImage() {
		var lastImg = currentImg;
		currentImg = carousel.getNextImage();
		//document.body.appendChild(currentImg.img);

		lastImg.fadeOut(function() {
			
			//document.body.removeChild(lastImg);
		});
		currentImg.fadeIn();
		background.draw();
	}

	


}(window.cxgallery));
