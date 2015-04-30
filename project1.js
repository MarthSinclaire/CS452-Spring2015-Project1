var gl;
var vertices;
var moVerts;
var bufferId;
var buffer2;
var vPosition;
var program;
var keyleft, keyright, keyup, keydown;
var posX;
var posY;
var time = 6000;
var score = 0;
console.log(posX, posY);
var clock = document.getElementById("time");
var count = document.getElementById("score");

// author Dalton Patterson

window.onload = function init()
{
	var canvas = document.getElementById( "gl-canvas" );
	posX = -1 + 2*Math.random();
	posY = -1 + 2*Math.random();
	// canvas.width =  screen.availWidth-50;
	// canvas.height =  screen.availHeight-200;

	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	
	vertices = new Float32Array([.05,.05, 
				-.05,.05, 
				.05,-.05, 
				-.05,-.05]);
				
	moVerts = new Float32Array([posX+.05, posY+.05,
				posX-.05, posY+.05, 
				posX+.05, posY-.05, 
				posX-.05, posY-.05]);
//
// Configure WebGL
//
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
// Load shaders and initialize attribute buffers
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

    bufferId = gl.createBuffer();
	buffer2 = gl.createBuffer();
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
	
	gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );
	gl.bufferData( gl.ARRAY_BUFFER,moVerts, gl.STATIC_DRAW );
	
	vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	render();
	update();
};

function update() {
	if(time > 0){
	if(keyright){
		if(vertices[0] < 1){
			for(var i = 0; i < vertices.length; i +=2){
				vertices[i] += .02;
			}
		}
	}
	if(keyup){
		if(vertices[1] < 1){
			for(var i = 1; i < vertices.length; i +=2){
				vertices[i] += .02;
			}
		}
	}
	if(keydown){
		if(vertices[5] > -1){
			for(var i = 1; i < vertices.length; i +=2){
				vertices[i]-= .02;
			}
		}
	}
	
	if(keyleft){
		if(vertices[2] > -1){
			for(var i = 0; i < vertices.length; i +=2){
				vertices[i] -= .02;
			}
		}
	}
	
	for(var i = 0; i < vertices.length; i+=2){
//		console.log(vertices[i], vertices[++i]);
//		console.log(posX, posY);
		if(vertices[i] < posX+.05 && vertices[i] > posX-.05 && vertices[++i] < posY+.1 && vertices[++i] > posY-.1){
			++score;
			posX = -1 + 2*Math.random();
			posY = -1 + 2*Math.random();
			moVerts = new Float32Array([posX +.05, posY+.05,
				posX-.05, posY+.05, 
				posX+.05, posY-.05, 
				posX-.05, posY-.05]);
//			console.log(score);
		}
	}
	document.getElementById("score").innerHTML = "Score: " + score;
	document.getElementById("time").innerHTML = "Time: " + time/100;
	}
}

function render() {
	update();
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );
	vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
	gl.bufferData( gl.ARRAY_BUFFER,moVerts, gl.STATIC_DRAW );
	vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	if(time > 0){
	--time;
	}
    requestAnimFrame( render );
}
				$(document).keydown(function(e) {
					if(e.which == 68){
						keyright = true;
					}
					
					else if(e.which == 87){
						keyup = true;
					}
					
					else if(e.which == 83){
						keydown = true;
					}
					
					else if(e.which == 65){
						keyleft = true;
					}
//					console.log(e.which);
				});

				$(document).keyup(function(e) {
					if(e.which == 68){
						keyright = false;
					}
					if(e.which == 87){
						keyup = false;
					}
					if(e.which == 83){
						keydown = false;
					}
					if(e.which == 65){
						keyleft = false;
					}
				});