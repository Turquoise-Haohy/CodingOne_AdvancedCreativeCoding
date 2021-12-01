<!DOCTYPE html>
<html>
<head>
   <script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js"></script>
	<style>
		body {
			margin: 0px;
			background-color: #000000;
			overflow: hidden;
		}
	</style>
</head>
<body>
	<script id="vertexShader" type="x-shader/x-vertex">
		void main() { gl_Position = vec4( position, 1.0 ); }
	</script>
	<script id="fragmentShader" type="x-shader/x-fragment">
		//============================================================
		//PUT YOUR GLSL CODE HERE
		//============================================================

		#define PI 3.1415926535897932384626433832795
	
        precision mediump float;
        
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform float time;
        
        
        
        void main() {
        vec2 coord = 6.0 * gl_FragCoord.xy/resolution;
        
        for (int n = 1;n<8; n++){
        float i = float(n);
        coord += vec2(0.7/i * sin(i * coord.y + time + 0.3 * i) + 0.8, 0.4/i * sin(coord.x + time + 0.3 *i) + 1.6);
        }
        
        vec3 color = vec3(0.5 * sin(mouse.x*coord.x) + 0.5, 0.5 * sin(mouse.y*coord.y) + 0.5, sin(mouse.x*coord.x + mouse.y*coord.y));
        
        gl_FragColor = vec4(color, 1.0);    
        }


		//============================================================
		//END OF GLSL CODE
		//============================================================
	</script>
	<script>
		//change the resolution here. 1 is highest
		var pixel_resolution = 5;
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
