 //create the scene
 var scene = new THREE.Scene();
 var ratio = window.innerWidth / window.innerHeight;
 //create the perspective camera

 var camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);

 //set the camera position
 camera.position.set(0, 5, 15);
 camera.lookAt(0, 0, 5);

 //create the webgl renderer
 var renderer = new THREE.WebGLRenderer();

 //set the size of the rendering window
 renderer.setSize(window.innerWidth, window.innerHeight);

 //add the renderer to the current document
 document.body.appendChild(renderer.domElement);

 //create the material of the cube (basic material)
 var material_cube = new THREE.MeshBasicMaterial();
 //set the color of the cube
 material_cube.color = new THREE.Color(0, 1, 0);
 //activate the wireframe of the cube material
 material_cube.wireframe = true;
 //create the grometry box of the cube
 var geometry_cube = new THREE.BoxGeometry(2, 2, 2);
 //create the mesh of a cube
 var cube = new THREE.Mesh(geometry_cube, material_cube);

 //translate base position of the created objects
 cube.position.x -= 2;

 //and add to the scene
 scene.add(cube);

 //render the scene and the camera onto the canvas
 renderer.render(scene, camera);