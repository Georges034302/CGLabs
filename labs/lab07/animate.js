/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.05;
var velocity = 0.1;
var heightWave = 0.05;
var period = 20;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;


function animateWave() {
    //Animate wave periodically
}

var gui;

function buildGui() {
    //Add GUI control panel
}

function bounce(object) {
    //Bounce the object off the floor
}

//final update loop
var updateLoop = function() {
    bounce(sphere);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animateWave();
};