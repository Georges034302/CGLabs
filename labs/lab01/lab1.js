//SETUP STAGE
//-1 create a scene
var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;

//-2 create a camera
var camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);

//3- set the camera position
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 5);

//4- create a renderer and setup a renderer from WebGL
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//CREATE A SHAPE (i.e CUBE)
//1-create the cube material
var cube_material = new THREE.MeshBasicMaterial();

//2-setup the cube color
cube_material.color = new THREE.Color(0, 1, 0);

//3-decide on the visibility style (i.e wireframe)
cube_material.wireframe = true;

//4-create the shape geometry(i.e cube)
var cube_geometry = new THREE.BoxGeometry(2, 2, 2);

//5- Build the cube from geometry and material
var cube = new THREE.Mesh(cube_geometry, cube_material);

//6- set the shape position
cube.position.x -= 2;


//ADD THE SHAPE TO THE SCREEN AND RENDER THE VIEW
scene.add(cube);
renderer.render(scene, camera);