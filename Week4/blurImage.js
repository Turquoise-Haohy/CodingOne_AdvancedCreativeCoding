<!DOCTYPE HTML>
<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="400" height="200"></canvas>
    <canvas id="myCanvas2" width="400" height="200"></canvas>
   
    
    <h1>HAPPY HALLOWEEN</h1>
    

    
    <script>
      
        var mouseX;
        var mouseY; 
        let blur = 1;
        var imageObj = new Image();
        imageObj.src = "kirby.jpg";
       
        var canvas = document.getElementById('myCanvas');
        var canvas2 = document.getElementById('myCanvas2');
      
        canvas.addEventListener("mousemove", getMouse, false);

        var context = canvas.getContext('2d');
        var context2 = canvas2.getContext('2d');
       
     
      
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;

        context2.drawImage(imageObj, 0, 0, 400, 200);

        var imageData = context2.getImageData(0, 0, imageWidth, imageHeight);
        
          
        var data = imageData.data;
        
   
        var imageData2 = context.getImageData(0, 0, imageWidth, imageHeight);

           // iterate over all pixels
        for(var i = 1; i < imageHeight-1; i++) {
            
            // This is the row above
            var collm1=(i-1)*imageWidth;
            // This is the row below
            var collp1=(i+1)*imageWidth;
            
          // loop through each row
          for(var j = 1; j < imageWidth-1; j++) {
 
 // This is the X gradient                       
            imageData2.data[((imageWidth * i) + j) * 4] = 
              (1/9)*((data[(collm1 + j-1) * 4]) + 
              (data[(collm1 + j) * 4]) + 
              (data[(collm1 + j-1) * 4]) + 
              (data[((imageWidth * i) + j-1) * 4]) + 
              (data[((imageWidth * i) + j) * 4]) + 
              (data[((imageWidth * i) + j+1) * 4]) + 
              (data[(collp1 + j-1) * 4]) + 
              (data[(collp1 + j) * 4]) + 
              (data[(collp1 + j+1) * 4]));
            imageData2.data[((imageWidth * i) + j) * 4+1] = 
              (1/9)*((data[(collm1 + j-1) * 4+1]) + 
              (data[(collm1 + j) * 4+1]) + 
              (data[(collm1 + j-1) * 4+1]) + 
              (data[((imageWidth * i) + j-1) * 4+1]) + 
              (data[((imageWidth * i) + j) * 4+1]) + 
              (data[((imageWidth * i) + j+1) * 4+1]) + 
              (data[(collp1 + j-1) * 4+1]) + 
              (data[(collp1 + j) * 4+1]) + 
              (data[(collp1 + j+1) * 4+1]));
            
            imageData2.data[((imageWidth * i) + j) * 4+2] = 
              (1/9)*((data[(collm1 + j-1) * 4+2]) + 
              (data[(collm1 + j) * 4+2]) + 
              (data[(collm1 + j-1) * 4+2]) + 
              (data[((imageWidth * i) + j-1) * 4+2]) + 
              (data[((imageWidth * i) + j) * 4+2]) + 
              (data[((imageWidth * i) + j+1) * 4+2]) + 
              (data[(collp1 + j-1) * 4+2]) + 
              (data[(collp1 + j) * 4+2]) + 
              (data[(collp1 + j+1) * 4+2]));
            
            imageData2.data[((imageWidth * i) + j) * 4+3] = 255;
          }
        }    
                
      context.putImageData(imageData2,0,0);
      

      
      function getMouse(mousePosition) {
        if (mousePosition.layerX || mousePosition.layerX === 0) {
          mouseX = mousePosition.layerX;
          mouseY = mousePosition.layerY;
        } else if (mousePosition.offsetX || mousePosition.offsetX === 0) {
          mouseX = mousePosition.offsetX;
          mouseY = mousePosition.offsetY;
        }
      }
      
 
   
    </script>
  </body>
</html>     
