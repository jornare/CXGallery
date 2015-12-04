
window.cxgallery = window.cxgallery || {};


(function(ns){
"use strict"

	class ImageCarousel {
		
		constructor(path) {
			var carousel = this;
			this.container = document.createElement('div');
			this.container.classList.add('imageCarousel');
			this.titleDiv = document.createElement('div');
			this.titleDiv.classList.add('title');
			this.titleTextDiv = document.createElement('div');
			this.titleTextDiv.classList.add('titleText');
			this.currentImg = new Image(1, path);
			this.nextImg = new Image(2, path);
			this.container.appendChild(this.currentImg.img);
			this.container.appendChild(this.nextImg.img);
			this.container.appendChild(this.titleDiv);
			this.container.appendChild(this.titleTextDiv);
			this.currentImg.fadeIn();
			this.interval = null; //not playing
			this.path = path;
			this.imageFiles = [];
			this.currentImageFile = -1;
			this.titles = {};
			this.loadTitles(function() {
				this.setTitle(this.titles[this.currentImg.id] || '');
			});
			this.nextImg.onError = this.currentImg.onError = function() {
				if(this.currentImageFile == -1) {
					this.load(1);
				}else if(carousel.imageFiles.length){
					console.log('err');
				}
			};	
		}

		loadTitles(callback) {
			var xhttp = new XMLHttpRequest(),
				self = this;
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.responseText) {
					self.parseTitles(xhttp.responseText);
					callback.call(self);
				}
			};
			xhttp.open("GET", this.path + "titles.txt", true);
			xhttp.send();
		}
		
		parseTitles(titles) {
			var ix, a, i, t = titles.split('\n');
			this.titles = {};
			for(i = 0; i< t.length; i++) {
				a = t[i].trim().split(' ');
				ix = a[0] || 0;
				this.titles[ix] = a.slice(1).join(' ');
			}
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
				var lastImg = self.currentImg,
					title = self.titles[self.nextImg.id] || '';
				self.currentImg = self.nextImg;
				self.nextImg = lastImg;
				if(self.imageFiles.length) {
					self.currentImageFile = (self.currentImageFile + 1) % self.imageFiles.length;
					self.nextImg.loadFile(self.currentImageFile, self.imageFiles[self.currentImageFile]);
				} else {
					self.nextImg.load(self.currentImg.id + 1);
				}
				self.setTitle(title);
			});
		}
		
		addImageFile(fileHandle) {
			this.titles[this.imageFiles.length] = this.fileNameToTitle(fileHandle.name);
			this.imageFiles.push(fileHandle);
			this.currentImageFile = this.currentImageFile == -1 ? 0 : this.currentImageFile;
		}
		
		fileNameToTitle(fileName) {
			var i = fileName.lastIndexOf('.'), parts;
			fileName = fileName.substr(0, i); //remove extension
			parts = fileName.split(' ');
			if(parseInt(parts[0]) == parts[0] && parts.length > 1) { //remove number
				fileName = parts.slice(1).join(' ');
			}
			if(fileName.charAt(0) == '_') { //empty title if filename starts with underscore
				return '';
			}
			fileName.replace('_', ' ');
			return fileName;
		}
		
		setTitle(title) {
			if(title) {
				this.titleDiv.style.display = this.titleTextDiv.style.display = 'inline-block';
				this.titleDiv.style.left = this.titleTextDiv.style.left = this.currentImg.img.offsetLeft + 'px';
				this.titleDiv.style.top = this.titleTextDiv.style.top = this.currentImg.img.offsetTop + 'px';
				this.titleTextDiv.innerText = title;
				this.titleDiv.style.width = this.titleTextDiv.offsetWidth + 'px';
				this.titleDiv.style.height = this.titleTextDiv.offsetHeight + 'px';
			} else {
				this.titleDiv.style.display = this.titleTextDiv.style.display = 'none';
			}
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
			this.title = '';
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
		
		loadFile (id, fileHandle) {
			var reader = new FileReader(),
				img = this.img;
			this.id = id;
			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				return function(e) {
					img.src = e.target.result;
					
				};
			})(fileHandle);
		
			// Read in the image file as a data URL.
			reader.readAsDataURL(fileHandle);
		}
		
		fadeIn(callback){
			var self = this;
			//this.img.classList.remove('fadeout');
			this.img.classList.add('fadein');
			callback && setTimeout(function () {
				callback.call(self);}, 800);
		}
		fadeOut(callback) {
			var self = this;
			this.img.classList.remove('fadein');
			//this.img.classList.add('fadeout');
			callback && setTimeout(function () {
				callback.call(self);}, 800);
		}
	}
	ns.Image = Image;
	ns.ImageCarousel = ImageCarousel;
	
}(window.cxgallery));