//Create a sphere with radius, vlines, hlines and color(r,g,b)
function createSphere(radius, hlines, vlines, r, g, b) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(r, g, b);
    material.wireframe = true;
    var geometry = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry, material);
    return sphere;
}

var earth = createSphere(2, 44, 44, 0, 1, 0);
var moon = createSphere(1, 32, 32, 1, 1, 1);

function addShapes() {
    scene.add(earth);
    scene.add(moon);
}