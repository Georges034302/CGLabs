/* global THREE, scene, renderer, camera */
function createSphere(radius, hlines, vlines, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    material.shininess = 100;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

//Create a cube using variable w, h, d and a hex-color
function createCube(w, h, d, color) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = true;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new THREE.Mesh(geometry_cube, material);
    return square;
}

var n = 36;
var cubes = [];
const group = new THREE.Group();

function createShapes() {
    for (let i = 0; i < n; i++) {
        var rot2 = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();
        sca.makeScale(0.5, 3, 1.5);
        rot2.makeRotationZ(i * (Math.PI / n));
        tra.makeTranslation(10, 5, 0);
        rot.makeRotationY(i * (2 * Math.PI / n));
        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);
        var color = new THREE.Color(0xffffff);
        color.setHex(Math.random() * 0xffffff);
        cubes[i] = createCube(1, 1, 1, color);
        cubes[i].applyMatrix(combined);
        group.add(cubes[i]);
    }
    var sphere_color = new THREE.Color(0xD3D3D3);
    var sphere = createSphere(5, 24, 24, sphere_color);
    sphere.position.y = 4;
    //focus spotlight on the sphere
    group.add(sphere);
}

function createFloor() {
   //create floor and add floor to the objects group
}

function addSpotlight(object) {
   //create a spotlight and add the spotlight to the objects group
}

function addShapes() {
    //add the group of cubes to the scene
    scene.add(group);
    scene.add(camera);
    scene.add(ambientLight);
}