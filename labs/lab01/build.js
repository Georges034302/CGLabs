/* global THREE, scene, renderer, camera */



//Create a cube using variable w, h, d
function createCube(w, h, d, r, g, b) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(r, g, b);
    material.wireframe = true;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var cube = new THREE.Mesh(geometry_cube, material);
    return cube;
}

//Create a sphere using variable radius, vertical lines, horizontal lines
function createSphere(radius, hlines, vlines, r, g, b) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(r, g, b);
    material.wireframe = true;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

var cube = createCube(2, 2, 2, 0, 1, 0);
var sphere = createSphere(1, 32, 32, 1, 0, 1);

function addShapes() {
    scene.add(cube);
    scene.add(sphere);
}