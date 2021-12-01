<!DOCTYPE html>
<html>
<head>
  	<style>
		body {
			margin: 0px;
			background-color: #000000;
			overflow: hidden;
		}
	</style>
     <script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js"></script>
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

</head>
<body>
	<script id="vertexShader" type="x-shader/x-vertex">
		void main() { gl_Position = vec4( position, 1.0 ); }
	</script>
	<script id="fragmentShader" type="x-shader/x-fragment">
		//============================================================
		//PUT YOUR GLSL CODE HERE
		//============================================================

  precision mediump float;
        
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform float time;
        #define C_PI 3.14159265358979323846
        
        float circle(vec2 pos, float size) {
            
            size = 1./size;
            size*=9.;
            float aspect = resolution.x/resolution.y;
            
            vec2 normCoord = vec2(gl_FragCoord.x/(resolution.x) * aspect,gl_FragCoord.y/resolution.y);
            float angle = C_PI * (mouse.x)*0.3;
    		mat2 rotation = mat2( cos(angle), sin(angle),
                                -sin(angle), cos(angle));
        	mat2 scale = mat2(2.,0.,0.,2.);
            
            vec2 circlePos = pos*(C_PI/10.*time);
            
            float colour = distance((normCoord/1.2),pos*rotation/1.3);
            return smoothstep(colour * size, colour * size+0.2,1.);
        }
       
        float line(vec2 normalised_Coordinate, float funct) {
           
       return smoothstep(0.04, 0., normalised_Coordinate.y-funct )-smoothstep(0.02, 0., normalised_Coordinate.y);
        }      
        
        
        void main(){       
            
        	vec2 pos = gl_FragCoord.xy/resolution;
            float circleOne = circle(vec2(0.2,0.8),1.);
            
              
            
            float y = 0.5+ 0.5*(sin((pos.x + time)*C_PI) * 0.5);
            float y2 = 0.5+ 0.5*(sin((pos.x - time)*C_PI) * 0.5);
            float y3 = 0.7+ 0.5*(sin((pos.x - time+0.2)*C_PI) * 0.5);
            //float y4 = 0.5+ 0.5*(sin((pos.x + time + 0.3)*6.28) * 0.5 );

            
            vec3 color = vec3(y);           
            vec3 color2 = vec3(y2);
            vec3 color3 = vec3(y3);
            //vec3 color4 = vec3(y4);
            
            // Plot a line

            
            float lines = line(pos,y);
            float lineA = line(pos,y2);
            float lineB = line(pos, y3);
            //float lineC = line(pos, y4);
           
            color = vec3(lines*0.2,lines*0.2,lines*0.8);
            color2 = vec3(lineA*0.,lineA*0.2,lineA*0.8);
            color3 = vec3(lineB*0.,lineB*0.2,lineB * 0.5);
            //color4 = vec3(lineC*0.,lineC*0.2,lineC * 0.5);
            
                    
        	gl_FragColor = vec4(color + color2 + color3,0.8);
            
   
        }

	//============================================================
		//END OF GLSL CODE
		//============================================================
	</script>
	<script>
		//change the resolution here. 1 is highest
		var pixel_resolution = 2;
		var container, stats;
		var camera, scene, renderer;
		var uniforms;
		init();
		animate();
function init() { 
			camera = new THREE.Camera();
			camera.position.z = 1;
			scene = new THREE.Scene();
			var geometry = new THREE.PlaneBufferGeometry(2, 2);
			uniforms = { time: { type: 'f', value: 1.0 }, resolution: { type: 'v2', value: new THREE.Vector2() }, mouse: {type: "v2", value: new THREE.Vector2()}};
			var material = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: document.getElementById('vertexShader').textContent, fragmentShader: document.getElementById('fragmentShader').textContent });
			var mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);
			renderer = new THREE.WebGLRenderer();
			//Hack here to change resolution 
			renderer.setPixelRatio(window.devicePixelRatio / pixel_resolution);
			document.body.appendChild(renderer.domElement);
			onWindowResize();
			window.addEventListener('resize', onWindowResize, false);
	        window.addEventListener('mousemove', onMouseMove, false);

		}
		function onWindowResize(event) {
			renderer.setSize(window.innerWidth, window.innerHeight);
			uniforms.resolution.value.x = renderer.domElement.width;
			uniforms.resolution.value.y = renderer.domElement.height;

		}
		function animate() {
			requestAnimationFrame(animate);
			render();
		}
		function onMouseMove( event ) {
        	uniforms.mouse.value.x = 2 * ( event.clientX / window.innerWidth );
 	        uniforms.mouse.value.y = 2 * ( 1-(event.clientY) / window.innerHeight
 	        );
        }
		function render() {
			uniforms.time.value += 0.01;
			renderer.render(scene, camera);
		}
	</script>
</body>
</html>
