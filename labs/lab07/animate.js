/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.02;
var velocity = 0.1;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;


function animate() {

}

function buildGui() {

}

function bounce(object) {

}

//final update loop
var updateLoop = function() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animate();
};