window.cxgallery = window.cxgallery || {};
(function(ns){
	'use strict'
	//vertex shader
	var vs = 'attribute vec2 pos;' +
	         'varying vec4 v_positionWithOffset;' +
	         'uniform vec4 u_offset;' +
			 'void main() {' +
			 	'gl_Position = vec4(pos, 0, 1) + u_offset;' +
			 	'v_positionWithOffset = vec4(gl_Position)*0.5+0.5;' +
			 '}';
	//fragment shader
	var fs = '#define PI 3.1415926535897932384626433832795\n'
			 '#define PIHALF 1.570796326794897\n' +
			 'precision mediump float;' +
			 'varying vec4 v_positionWithOffset;' +
			 'void main() {' +
			 	'float x = v_positionWithOffset.x;' +
			 	'float y = v_positionWithOffset.y;'+
				'gl_FragColor = vec4(x, y, 0.0, 0.0) * (1.0 - (x*x)) * (1.0 -(y*y));' +
			 '}';
	var vertices = [-1.0, -1.0, 1.0, 1.0, 1.0, -1.0]; 
		
	class Background {
		constructor(gl) {
			//gl.clearColor(0.1, 0.42, 0.55, 1.0);
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			// Enable depth testing
			gl.enable(gl.DEPTH_TEST);
			// Near things obscure far things
			gl.depthFunc(gl.LEQUAL);
	
			this.program = createProgram(gl, vs,fs);
		}

		draw (canvas) {
			var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			var t = Date.now()*0.001;
			vertices[0]=Math.sin(t);
			vertices[1]=Math.cos(t); 
			bindVertices(gl, vertices);
	
			prepareProgram(this.program, gl);
			// Clear the color as well as the depth buffer.
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			
			gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);	
		}
	}
	
	function bindVertices(gl, vertices){
		var vertexPosBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	}
	
	function prepareProgram(program, gl) {
		gl.useProgram(program);
		program.vertexPosAttrib = gl.getAttribLocation(program, 'pos');
		gl.enableVertexAttribArray(program.vertexPosAttrib);
		gl.vertexAttribPointer(program.vertexPosAttrib, 2, gl.FLOAT, false, 0, 0);
	}
	
	function createProgram(gl, vstr, fstr) {
		var program = gl.createProgram();
		var vshader = createShader(gl, vstr, gl.VERTEX_SHADER);
		var fshader = createShader(gl, fstr, gl.FRAGMENT_SHADER);
		gl.attachShader(program, vshader);
		gl.attachShader(program, fshader);
		gl.linkProgram(program);
		return program;
	}
	function createShader(gl, str, type) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, str);
		gl.compileShader(shader);
		return shader;
	}
	ns.Background = Background;
}(window.cxgallery))