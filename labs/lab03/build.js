/* global THREE, scene, renderer, camera */

//In this lab we use a group to organise the matrices of a set of cubes
//Create a group for the cubes set

var n = 36;
var cubes = [];
//Create a cube using variable w, h, d
function createCube(w, h, d, color) {
    var material = new THREE.MeshBasicMaterial();

    //In this ab we will use the hex-color which is easier to randmomize
    material.color = new THREE.Color(color);
    material.wireframe = true;
    var geometry_cube = new THREE.BoxGeometry(w, h, d);
    var square = new THREE.Mesh(geometry_cube, material);
    return square;
}

function createShapes() {
    for (let i = 0; i < n; i++) {
        //Add Matrices for translation, rotation, scaling
        //randomize the color of each cube in the group
        cubes[i] = createCube(1, 1, 1, 0xff0000);

        //replace the line  below and add the cubes to a group
        scene.add(cubes[i]);
    }
}

function addShapes() {
    //add the group of cubes to the scene
}