
window.cxgallery = window.cxgallery || {};


(function(ns){
"use strict"

	class ImageCarousel {
		
		constructor() {
			this.currentImg = new Image(1);
			this.nextImg = new Image(2);
			this.nextImg.img.style.opacity = 0;
			this.interval = null; //not playing
			
			this.nextImg.onError = this.currentImg.onError = function() {
				this.load(1);
			};	
		}

		getCurrentImage(){
			return this.currentImg;
		}
		
		getNextImage() {
			var nImg = this.nextImg;
			this.nextImg = this.currentImg;
			this.currentImg = nImg;
			this.nextImg.load(this.currentImg.id + 1);
			return this.currentImg;
		}
		
		goNext() {
			var self = this;
			this.currentImg.fadeOut(function() {
				console.log('fade out' + this.id);
			});
			this.nextImg.fadeIn(function() {
				console.log('fade in' + this.id);
				var lastImg = self.currentImg;
				self.currentImg = self.nextImg;
				self.nextImg = lastImg;
				self.nextImg.load(self.currentImg.id + 1);
			});
		}
		
		play(interval) {
			var self = this;
			interval = interval || 5000;
			this.stop();
			this.interval = setInterval(function() {
				self.goNext();	
			}, interval);
		}
		
		pause() {
			clearInterval(this.interval);
			this.interval = null;
		}
		
		stop() {
			clearInterval(this.interval);
			this.interval = null;
		}
		
		hide(){
			this.currentImg.img.style.display='none';
			this.nextImg.img.style.display='none';
		}
		
		show() {
			this.currentImg.img.style.display='block';
			this.nextImg.img.style.display='block';
		}
	}
	
	ns.ImageCarousel = ImageCarousel;

	class Image{
		constructor(id) {
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
	
		load(id) {
			this.id = id;
			this.img.src = "gallery/" + id + '.jpg';
		};
		
		fadeIn(callback){
			var self = this;
			//this.img.classList.remove('fadeout');
			this.img.classList.add('fadein');
			callback && setTimeout(function () {
				callback.call(self);}, 500);
		}
		fadeOut(callback) {
			var self = this;
			this.img.classList.remove('fadein');
			//this.img.classList.add('fadeout');
			callback && setTimeout(function () {
				callback.call(self);}, 500);
		}
	}
	ns.Image = Image;
	ns.ImageCarousel = ImageCarousel;
	
}(window.cxgallery));