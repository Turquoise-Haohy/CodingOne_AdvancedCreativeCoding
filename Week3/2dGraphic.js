<html>

<head>
 <script src = "https://mimicproject.com/libs/maximilian.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>
 
    

</head>

<body>
   <canvas id="myCanvas"></canvas>

</body>
<script type="text/javascript">

var s = 4;
var m = 20;
let patterns=[];//array to build several patterns
  
let canvasWidth;
let canvasHeight;

let canvas=document.getElementById("myCanvas");

context=myCanvas.getContext("2d");

canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;


myCanvas.style.position = "fixed"; 

//starting color value
//for pattern
 var r1 = 50;
 var g1 = 150;
 var b1 = 80;
  
//for background
 var r2 = 0;
 var g2 = 0;
 var b2 = 50;

function setup() {
  //starting color value
  //for pattern
  
  createCanvas(innerWidth, innerHeight);
  
  //generate a series of patterns
  let p = new Pattern();
  patterns.push(p);
}


function draw() {
  //background color, change when clicking
  background(r2, b2, g2);
  
  //stroke for the pattern
  strokeJoin(ROUND);
  stroke(255);
  strokeWeight(1);
  
  //color for the pattern
  fill(r1, g1, b1);
  //position for the first pattern
  translate(-100, height/2);
  //iteration
  for (let pattern of patterns){
    for(a=0; a<6; a++){
       translate(200, 0);
       pattern.show();
    }
  }
}

//build a class for the pattern, draw two variation lines based on the sin function and connect them together as an object, then rotate them in a circle as the final pattern.
class Pattern {
  constructor() {
  }
  
  show(){
    //rotate the variation lines
    for (var i = 0; i < 360; i += m) {
      push();
      translate(0, 0);
      rotate(radians(i));
      
    //draw the single line object
    //line1 and line2 run adversly
      beginShape();
      for (var j = 0; j <= m; j += 0.5) {
        var line1 = (sin(radians(j * 10 + frameCount)) * (5 + sin(radians(j * 9)) * (j * 3)));
        vertex(sin(radians(0)) * (10 + j * s) + line1, (10 + j * s) + 10);
          }

      for (var k = m; k >= 0; k -= 0.5) {
        var line2 = (sin(radians(k * 10 + frameCount)) * (5 + sin(radians(k * 9)) * (k * 3)));
        vertex(sin(radians(0)) * (10 + k * s) - line2, (10 + k * s) + 10);
          }

      endShape(CLOSE);
      pop();
        }

      }
}

function mouseClicked(){
  //everytime click the mouse, change the color for both background and pattern.
  //for pattern, with a darker palette
  r1 = random(125);
  g1 = random(125);
  b1 = random(125);
  
  //for background with a lighter palette
  r2 = random(150,225);
  g2 = random(150,225);
  b2 = random(150,225);
  
}
  </script>

</html>
