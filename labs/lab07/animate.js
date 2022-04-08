/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.02;
var velocity = 0.1;

function animate() {

}

function buildGui() {

}

function rotate(object) {
    object.rotation.x += velocity;
    object.rotation.z += velocity;
    object.rotation.y += velocity;
}

//final update loop
var updateLoop = function() {
    rotate(sphere);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animate();
};