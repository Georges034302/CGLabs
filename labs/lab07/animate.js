/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.05;
var velocity = 0.1;
var heightWave = 0.05;
var period = 20;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

//Define a function to animate the tissue
// 1- animation should be a ripple-pattern
// 2- The length of ripple: period * currP.length() / size;
// 3- calculate z position: heightWave * size * Math.cos(len + interval);
// 4- set z position for every vector point i
function animate() {
   
}

//Create a GUI menu to control:
// 1- color of the tissue
// 2- animation velocity of the tissue
var gui;
function buildGui() {
    
}

//Define a function to animate a sphere
//Ensure that the sphere bounces in the center of the tissue-mesh
function bounce(object) {
    
}

//final update loop --> animate the GUI
//Ensure orbit-controls are available for this GUI
var updateLoop = function () {
    
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);

};