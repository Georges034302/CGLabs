var scene = new THREE.Scene();
var ratio = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);

camera.position.set(2,5,15);
camera.lookAt(0,1,5);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var cube_material = new THREE.MeshBasicMaterial();
cube_material.color = new THREE.Color(0,1,0);
cube_material.wireframe = true;
var cube_geo = new THREE.BoxGeometry(3,3,3);
var cube = new THREE.Mesh(cube_geo,cube_material);
cube.position.x = -2;

var sphere_material = new THREE.MeshBasicMaterial();
sphere_material.color = new THREE.Color(55,1,0);
sphere_material.wireframe = true;
var sphere_geo = new THREE.SphereGeometry(2,16,16);
var sphere = new THREE.Mesh(sphere_geo,sphere_material);
sphere.position.x = 2;



scene.add(sphere);
scene.add(cube);

renderer.render(scene,camera);