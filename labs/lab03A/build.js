/* global THREE, scene, renderer, camera */

/*
 *
 * In this lab we use a group to organise the matrices of a set of cubes
 * Create a group for the cubes set
 * Define the number of cubes in the set [size of the cubes array]
 * 
 */


//Create a cube using variable w, h, d and a hex-color
function createCube(w, h, d, color) {
    var material = new THREE.MeshBasicMaterial();

    //In this ab we will use the hex-color which is easier to randmomize
    material.color = new THREE.Color(color);
    material.wireframe = true;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new THREE.Mesh(geometry_cube, material);
    return square;
}
//var cube = createCube(4, 4, 4, 0xff0000);
var n = 36;
var cubes = [];
const group = new THREE.Group();

function createCubes() {
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
}
/*
 * Define a function that creates a set of cubes
 * Add Matrices for translation, rotation, scaling
 * Randomize the color of each cube in the group
 * Add the cubes to a group
 */

function addShapes() {
    //add the group of cubes to the scene
    scene.add(group);
}