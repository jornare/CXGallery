window.cxgallery = window.cxgallery || {};

(function(ns){
	
	function ImageCarousel() {
		this.currentImg = new Image(1);
		this.nextImg = new Image(2);	
		
		this.nextImg.onError = this.currentImg.onError = function() {
			this.load(1);
		};
	}
	ImageCarousel.prototype.getCurrentImage = function (){
		return this.currentImg;
	};
	
	ImageCarousel.prototype.getNextImage = function () {
		var nImg = this.nextImg;
		this.nextImg = this.currentImg;
		this.currentImg = nImg;
		this.nextImg.load(this.currentImg.id + 1);
		return this.currentImg;
	}
	
	function Image(id) {
		var self = this;
		this.img = document.createElement('img');
		this.loaded = false;
		this.onLoaded = function(){};
		this.onError = function(){};
		this.img.onload = function(evt) {
			self.loaded = true;
			self.onLoaded();
		};
		this.img.onerror = function(evt) {
			self.loaded = false;
			self.onError();	
		};
		
		this.load(id);
	}
	
	Image.prototype.load = function(id) {
		this.id = id;
		this.img.src = "gallery/" + id + '.jpg';
	};
	
	Image.prototype.fadeIn = function(callback){
		this.img.classList.remove('fadeout');
		this.img.classList.add('fadein');
		callback && setTimeout(callback, 500);
	}
	Image.prototype.fadeOut = function(callback) {
		this.img.classList.remove('fadein');
		this.img.classList.add('fadeout');
		callback && setTimeout(callback, 500);
	}
	
	ns.Image = Image;
	ns.ImageCarousel = ImageCarousel;
	
}(window.cxgallery));