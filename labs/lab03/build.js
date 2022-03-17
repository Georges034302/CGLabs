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
var cube = createCube(4, 4, 4, 0xff0000);

/*
 * Define a function that creates a set of cubes
 * Add Matrices for translation, rotation, scaling
 * Randomize the color of each cube in the group
 * Add the cubes to a group
 */

function addShapes() {
    //add the group of cubes to the scene
    scene.add(cube);
}