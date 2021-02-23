//Set the pixel ration of the Canvas resolution
var ratio = window.innerWidth / window.innerHeight;
//To display anything with three.js, we need three objects: scene, camera and renderer.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
camera.position.set(2, 5, 15);
camera.lookAt(0, 1, 5);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create a cube from BoxGeometry and BasicMeshMaterial
var cube_material = new THREE.MeshBasicMaterial();
cube_material.color = new THREE.Color(0, 1, 0);
cube_material.wireframe = true;
var cube_geo = new THREE.BoxGeometry(3, 3, 3);
var cube = new THREE.Mesh(cube_geo, cube_material);
cube.position.x = -2;

//Create a cube from SphereGeometry and BasicMeshMaterial
var sphere_material = new THREE.MeshBasicMaterial();
sphere_material.color = new THREE.Color(55, 1, 0);
sphere_material.wireframe = true;
var sphere_geo = new THREE.SphereGeometry(2, 16, 16);
var sphere = new THREE.Mesh(sphere_geo, sphere_material);
sphere.position.x = 2;

//Add the geometrical objects to the scene
scene.add(sphere);
scene.add(cube);

//Render the scene and camera on the canvas
renderer.render(scene, camera);