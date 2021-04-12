/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.02;
var velocity = 0.1;
var gui;

//Animate the mesh using interval and velocity
function animateMesh() {

}


//Build a control panel gui
function buildGui() {

}

//final update loop
var animate = function() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    animateMesh();
};