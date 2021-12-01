<!DOCTYPE html>
<html>
  <head>

    <meta content="utf-8">
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
     <script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r123/three.js"></script>
  <script type="text/javascript" src="https://threejs.org/examples/js/controls/OrbitControls.js"></script> 

    <script>
      let scene, camera, renderer;
      var geometry, sphere;
      var distanceNum;
      var mouseX = 0;
      var mouseY = 0;
      var width = window.innerWidth;
      var height = window.innerHeight;   
      var HALF_WIDTH = width/2 ;
      var HALF_HEIGHT = height/2; 
      
      function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,45,30000);
        camera.position.set(-900,-200,15000);
        

        renderer = new THREE.WebGLRenderer({antialias:true});       renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);
        let controls = new THREE.OrbitControls(camera,renderer.domElement );
        controls.addEventListener('change', renderer);
        controls.minDistance = 500;
        controls.maxDistance = 20000;
        
        
        geometry = new THREE.SphereGeometry( 800, 32, 16 );
        //var material = new THREE.MeshNormalMaterial()
        var myTextureLoader = new THREE.TextureLoader();

	var myTexture = myTextureLoader.load('monet.png');   
	var material = new THREE.MeshBasicMaterial({map: myTexture});
sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
        
        
        
        var materialArray =[];
        let texture_ft = new THREE.TextureLoader().load( 'monet_ft.png');
        let texture_bk = new THREE.TextureLoader().load( 'monet_bk.png');
        let texture_up = new THREE.TextureLoader().load( 'monet_up.png');
        let texture_dn = new THREE.TextureLoader().load( 'monet_dn.png');
        let texture_rt = new THREE.TextureLoader().load( 'monet_rt.png');
        let texture_lf = new THREE.TextureLoader().load( 'monet_lf.png');
          
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
        for (let i = 0; i < 6; i++)
           materialArray[i].side = THREE.BackSide;
        let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
        let skybox = new THREE.Mesh(skyboxGeo, materialArray );
        scene.add( skybox );  
        animate();
      }
      function animate() {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.005;
    	sphere.rotation.y += 0.01;
        
      }
      init();
    </script>
  </body>
</html>
