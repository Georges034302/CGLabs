/* global THREE, scene, renderer, camera */
var earth;

//Create a sphere using variable radius, vertical lines, horizontal lines
function createSphere(radius, hlines, vlines,hex) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(hex);
    material.wireframe = false;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

function addShapes() {
    earth = createSphere(4, 32, 32, "#71706e");
    scene.add(earth);
    scene.add(camera);
    scene.add(ambietLight);
}