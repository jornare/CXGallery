
window.cxgallery = window.cxgallery || {};


(function(ns){
"use strict"

	class ImageCarousel {
		
		constructor(path) {
			this.currentImg = new Image(1, path);
			this.nextImg = new Image(2, path);
			this.currentImg.fadeIn();
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

			});
			this.nextImg.fadeIn(function() {
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
		constructor(id, path) {
			var self = this;
			this.path = path;
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
	
		load(id, path) {
			this.id = id;
			this.img.src = this.path + id + '.jpg';
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