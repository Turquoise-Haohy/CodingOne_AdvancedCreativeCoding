<!DOCTYPE html>
<html>
  <head>
<script src = "https://mimicproject.com/libs/maximilian.js"></script>
    <meta content="utf-8">
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
     <script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.js"></script>
  <script type="text/javascript" src="https://threejs.org/examples/js/controls/OrbitControls.js"></script> 

    <script>
      
      var camera, scene, renderer,controls;
      var up,
          head,
          body,
          plate,
          side,
          ground;
      var group = new THREE.Group();
      var bubbleGroup;
      var mouseX = 0;
      var mouseY = 0;
      var width = window.innerWidth;
      var height = window.innerHeight;   
      var HALF_WIDTH = width/2 ;
      var HALF_HEIGHT = height/2; 
      
      var myWidth = 256, myDepth = 256;
	
      
function init() {
        scene = new THREE.Scene();
        var data = generateHeight( myWidth, myDepth );
//         var myTexture = new THREE.TextureLoader().load('Hockney.jpeg');
//         scene.background = myTexture;
        scene.background = new THREE.Color( 0xefd1b5 );
		scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
       
        camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,45,30000);
        camera.position.z = -80;
        camera.position.y = -5;
        camera.lookAt(scene.position);
        

        renderer = new THREE.WebGLRenderer({antialias:true});             
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);
        onWindowResize();

    
        window.addEventListener('resize', onWindowResize, false); 

  
        controls = new THREE.OrbitControls(camera,renderer.domElement );
        controls.addEventListener('change', renderer);
        controls.minDistance = 1;
        controls.maxDistance = 100;
              
    
      
    var headGeometry = new THREE.CylinderGeometry( 20, 20, 4, 12 );
    var headMaterial = new THREE.MeshPhongMaterial({
    color:0x99ffcc,
    specular:0x4488ee,
    shininess:12,
    side: THREE.DoubleSide
});
    head = new THREE.Mesh( headGeometry, headMaterial );
    head.position.set(0,-5,0);
    
    
    var bodyGeometry = new THREE.CylinderGeometry( 4, 4, 30, 8 );
    var bodyMaterial = new THREE.MeshPhongMaterial({
    color:0xccffff,
    specular:0x4488ee,
    shininess:12   
});
    body = new THREE.Mesh( bodyGeometry, bodyMaterial );
    body.position.set(0,-15,0);
  
        
    plate = head.clone();
    plate.position.y =-30;
  
    
    var sideGeometry = new THREE.CylinderGeometry( 17, 17, 5, 12 );
  
    var sideMaterial = new THREE.MeshPhongMaterial({
    color:0xffcccc,
    specular:0x4488ee,
    shininess:12
});
     side = new THREE.Mesh( sideGeometry, sideMaterial );
     side.position.set(0,-30,0);
  
    var upGeometry = new THREE.CylinderGeometry( 2, 22, 5, 12 );
    var upMaterial = new THREE.MeshPhongMaterial({
    color:0xE6E6FA,
    specular:0x4488ee,
    shininess:12
});
     up = new THREE.Mesh( upGeometry, upMaterial );
     up.position.set(0,0,0);
  
  

    var groundGeometry = new THREE.PlaneGeometry(width,height,HALF_WIDTH,HALF_HEIGHT);
  groundGeometry.rotateX(- Math.PI/2);
//   var vertices = groundGeometry.attributes.position.array;

// 	for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
// 	vertices[ j + 1 ] = data[ i ] * 10;
//    }
//   console.log(vertices);
  
//   var textureLoader = new THREE.TextureLoader();

// var texture = textureLoader.load('R.png');
 var texture = new THREE.CanvasTexture( generateTexture( data, myWidth, myDepth ) );
// 				texture.wrapS = THREE.ClampToEdgeWrapping;
// 				texture.wrapT = THREE.ClampToEdgeWrapping;


// var textureBump = textureLoader.load('R.png');
var groundMaterial = new THREE.MeshPhongMaterial({
  map: texture, 
}); 
//   var groundMaterial = new THREE.MeshLambertMaterial({
//     color:0xE6E6FA,
//     side: THREE.Doubleside,
//     opacity: 0.7,
//     transparent:true
// }); 
  ground = new THREE.Mesh( groundGeometry, groundMaterial);
  ground.position.set(0,-35,0);
  
  
  bubbleGroup = new THREE.Group();
  var bubbleGeometry = new THREE.SphereGeometry(2,12,12);

  
  for(let i = 0; i < 100; i++){  
      
    var bubbleMaterial = new THREE.MeshLambertMaterial({
    color:0xffff66,
    side: THREE.Doubleside,
    opacity: 0.4,
    transparent:true
});
     var bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
     bubble.position.set((Math.random() - 0.5) * 300,
                         (Math.random() - 0.5) * 300,
                         (Math.random() - 0.5) * 300);
    bubble.rotation.x = Math.random()*2*Math.PI*10;
    bubble.rotation.y = Math.random()*2*Math.PI*8;
    bubble.rotation.z = Math.random()*2*Math.PI*6;
    
     bubbleGroup.add(bubble);
 } 
    scene.add(bubbleGroup);
    bubbleGroup.position.y = 4;
    
  
group.add( head );       
group.add( body );
group.add( side );
group.add(up);
group.position.y = 1;
 
scene.add(group);
scene.add( plate );
scene.add( ground );

addLight();                
animate();
 
      }
      
   
 function animate() {
      bubbleGroup.rotation.y += 0.005;
      bubbleGroup.rotation.x += 0.005;
      group.rotation.y += 0.005;
      plate.rotation.y -= 0.005;

      renderer.render(scene,camera);                                
      requestAnimationFrame(animate);     
      }
      
function addLight(){
      var sun = new THREE.DirectionalLight( 0xffffff, 0.5 );

      var directionalLight = new THREE.DirectionalLight( 0xBA55D3, 0.3 );
        directionalLight.position.set(60,-20,-80);
        directionalLight.target = side;
      var ambientlight = new THREE.AmbientLight( 0x404040 );  // soft white light
scene.add( sun );
scene.add( ambientlight );
scene.add( directionalLight );
      }

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
    
}   

//       function onMouseMove( event ) {
//         	uniforms.mouse.value.x = 2 * ( event.clientX / window.innerWidth );
//  	        uniforms.mouse.value.y = 2 * ( 1-(event.clientY) / window.innerHeight
//  	        );
//         }
      
function generateTexture( data, width, height ) {

				let context, image, imageData, shade;

				const vector3 = new THREE.Vector3( 0, 0, 0 );

				const soil = new THREE.Vector3( 1, 1, 1 );
				soil.normalize();

				const canvas = document.createElement( 'canvas' );
				canvas.width = width;
				canvas.height = height;

				context = canvas.getContext( '2d' );
				context.fillStyle = '#000';
				context.fillRect( 0, 0, width, height );

				image = context.getImageData( 0, 0, canvas.width, canvas.height );
				imageData = image.data;

				for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

					vector3.x = data[ j - 2 ] - data[ j + 2 ];
					vector3.y = 2;
					vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
					vector3.normalize();

					shade = vector3.dot( soil );

					imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.002 );
					imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.004 );
					imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );

				}

				context.putImageData( image, 0, 0 );			
				context.drawImage( canvas, 0, 0 );


  image = context.getImageData( 0, 0, canvas.width, canvas.height );
				imageData = image.data;

				for ( let i = 0, l = imageData.length; i < l; i += 4 ) {

					const v = ~ ~ ( Math.random() * 10 );

					imageData[ i ] += v;
					imageData[ i + 1 ] += v;
					imageData[ i + 2 ] += v;

				}

				context.putImageData( image, 0, 0 );

				return canvas;

			}
      
 function generateHeight( width, height ) {

				let seed = Math.PI / 4;
				window.Math.random = function () {

					const x = Math.sin( seed ++ ) * 10000;
					return x - Math.floor( x );

				};

				const size = width * height, data = new Uint8Array( size );
				const perlin = new ImprovedNoise(), z = Math.random() * 100;

				let quality = 1;

				for ( let j = 0; j < 4; j ++ ) {

					for ( let i = 0; i < size; i ++ ) {

						const x = i % width, y = ~ ~ ( i / width );
						data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

					}

					quality *= 5;

				}

				return data;

			}
      
var ImprovedNoise = function () {

	var p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
		 23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
		 174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
		 133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
		 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
		 202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
		 248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
		 178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
		 14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
		 93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

	for (var i=0; i < 256 ; i++) {

		p[256+i] = p[i];

	}

	function fade(t) {

		return t * t * t * (t * (t * 6 - 15) + 10);

	}

	function lerp(t, a, b) {

		return a + t * (b - a);

	}

	function grad(hash, x, y, z) {

		var h = hash & 15;
		var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
		return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);

	}

	return {

		noise: function (x, y, z) {

			var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);

			var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;

			x -= floorX;
			y -= floorY;
			z -= floorZ;

			var xMinus1 = x -1, yMinus1 = y - 1, zMinus1 = z - 1;

			var u = fade(x), v = fade(y), w = fade(z);

			var A = p[X]+Y, AA = p[A]+Z, AB = p[A+1]+Z, B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;

			return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), 
							grad(p[BA], xMinus1, y, z)),
						lerp(u, grad(p[AB], x, yMinus1, z),
							grad(p[BB], xMinus1, yMinus1, z))),
					lerp(v, lerp(u, grad(p[AA+1], x, y, zMinus1),
							grad(p[BA+1], xMinus1, y, z-1)),
						lerp(u, grad(p[AB+1], x, yMinus1, zMinus1),
							grad(p[BB+1], xMinus1, yMinus1, zMinus1))));

		}
	}
}
     
      init();
    </script>
  </body>
</html>
