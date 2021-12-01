<html>

<head>
</head>

<style>

canvas {
position: absolute;
top:0;
left:0;
}

</style>

<body>
    <canvas></canvas>
    <script>

var fov = 500;

var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.addEventListener('mousemove',getMouse,false);
var mouseX=0;
var mouseY=0;

var point = [];
var points = [];
var point3d = [];
var angleX = 0;
var angleY = 0;
var HALF_WIDTH = width / 2;
var HALF_HEIGHT = height / 2;

var x3d = 0;
var y3d = 0;
var z3d = 0;

var lastScale = 0;
var lastx2d = 0;
var lasty2d = 0;

// The below code creates a sphere of points
var dim = 100; // This is the number of rings
// Each ring has as many points as there are rings
// This is the spacing for each ring
var spacing = ((Math.PI * 2) / dim);

// This is the total number of points
var numPoints = dim * dim;

// This is how big the sphere is.
var size = 200;

// Now we build the sphere
for (var i = 0; i < dim ; i++) {
   var z = size * Math.cos(spacing * 3/2 * i);
// Calculate the size of the current ring    
    var s = size * Math.cos(spacing * 3/2 * i);
// For each ring..        
    for (var j = 0; j < dim; j++ ) {

var point = [Math.cos(spacing * j) * s + Math.cos(spacing * j * 3) * s *0.2,
Math.sin(spacing * j) * s - Math.sin(spacing * j * Math.sin(j)) * s,
             z];

// Add the point to the geometry.

        points.push(point);
    
    }
}

//
console.log(points.length);

function draw() {

    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, width, height);
    
    angleX=((mouseX/width)-0.5)/100;
    angleY=((mouseY/height)-0.5)/100

// Here we run through each point and work out where it should be drawn

    for (var i = 0; i < numPoints; i++) {
        point3d = points[i];
        z3d = point3d[2];
        if (z3d < -fov) z3d += 0;
        
        point3d[2] = z3d;
 
 // Calculate the rotation
 
    rotateX(point3d,angleX);
   rotateY(point3d,angleY);
 
 // Get the point in position 
 
        x3d = point3d[0];
        y3d = point3d[1];
        z3d = point3d[2];
// Convert the Z value to a scale factor
// This will give the appearance of depth
        var scale = (fov / (fov + z3d));

        var x2d = (x3d * scale) + HALF_WIDTH;

        var y2d = (y3d * scale) + HALF_HEIGHT;

// Draw the point

// Set the size based on scaling
        var lingrad = 			          context.createLinearGradient(0,0,width,height);
  		  lingrad.addColorStop(0, "rgba(20,28,200)");
          lingrad.addColorStop(0.5,"rgba(20,208,180,0.8)");
          lingrad.addColorStop(0.5, "rgba(18,150,100)");
      
        context.strokeStyle = lingrad;
        context.lineWidth = scale * 2;        
        //context.strokeStyle = "rgb(255,255,255 )";
        context.beginPath();
        context.moveTo(x2d  , y2d);
        context.lineTo(x2d + scale, y2d);
        context.stroke();
    }
	requestAnimationFrame(draw);
}

	requestAnimationFrame(draw);

function rotateX(point3d,angleX) {
        var	x = point3d[0]; 
        var	z = point3d[2]; 
	
        var	cosRY = Math.cos(angleX);
        var	sinRY = Math.sin(angleX);
        
        var	tempz = z; 
        var	tempx = x;

        x= (tempx*cosRY)+(tempz*sinRY);
        z= (tempx*-sinRY)+(tempz*cosRY);

        point3d[0] = x;
        point3d[2] = z;
          
}

function rotateY(point3d,angleY) {
        var y = point3d[1];
        var	z = point3d[2]; 
	
        var cosRX = Math.cos(angleY);
        var sinRX = Math.sin(angleY);
        
        var	tempz = z; 
        var	tempy = y;

        y= (tempy*cosRX)+(tempz*sinRX);
        z= (tempy*-sinRX)+(tempz*cosRX);

        point3d[1] = y;
        point3d[2] = z;
          
} 

    //here's our function 'getMouse'.
function getMouse (mousePosition) {
//for other browsers..
  if (mousePosition.layerX || mousePosition.layerX === 0) { // Firefox?
    mouseX = mousePosition.layerX;
    mouseY = mousePosition.layerY;
  } else if (mousePosition.offsetX || mousePosition.offsetX === 0) { // Opera?
    mouseX = mousePosition.offsetX;
    mouseY = mousePosition.offsetY;
  }
}

</script>

</body>

</html>
