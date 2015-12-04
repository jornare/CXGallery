# CXGallery
An application for showing a slideshow of photos

Requirements
============
The files must be .jpg and numbered from 1 (example: 1.jpg, 2.jpg, 3.jpg ...)
The files must be placed in the folder "gallery", or a path must be given in the url (see below)
OR
Drag-drop files to the window and the gallery will be replaced with the dropped files.
The files will be titled with their filename, and if it starts with a number this will be the sorting key.
Start the title with an underscore to make it not show in the console.
Example:
1 Title of my fist picture.jpg
2 This is a great day.jpg
3 _This is us again but this title will not show.jpg


Parameters
==========
Parameters are given in the url on the standard uri parameter format ?param1=value1&param2=value2

- interval: Controls the delay between photos in seconds (default is 5s)
- path: Controls where the photos are taken from (remember trailing slash or backslash). If the application is started from a server, a local path can not be given due to security reasons.
- template: Controls the background (turquois or purple)
Example:
index.html?interval=10&path=c:\mygallery\&template=purple

Optional
========
Since the pictures must be named with numbers, it is an option to supply a file with the titles to be displayed.
This file must be named 'titles.txt' and reside in the same folder as the pictures.
This file should contain lines starting with the picture number followed by a single space and then the title.

Example:
1 Title of my fist picture
2 This is a great day
3 This is us again