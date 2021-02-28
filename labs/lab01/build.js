/* global THREE, scene, renderer, camera */
var cube;
var sphere;


//Create a cube using variable w, h, d
function createCube(w, h, d, r, g, b) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(r, g, b);
    material.wireframe = true;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    cube = new THREE.Mesh(geometry_cube, material);

    scene.add(cube);
}

//Create a sphere using variable radius, vertical lines, horizontal lines
function createSphere(radius, hlines, vlines, r, g, b) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(r, g, b);
    material.wireframe = true;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    sphere = new THREE.Mesh(geometry_sphere, material);
    scene.add(sphere);
}