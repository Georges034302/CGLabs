/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.05;
var velocity = 0.1;
var heightWave = 0.05;
var period = 20;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

// The animate function updates the position of vertices in a 3D mesh to create a wave-like effect.
// It iterates through each vertex, calculates its current position, and modifies its z-coordinate based on a cosine function.
// The interval variable is incremented by the velocity to create a continuous animation effect.
// The position attribute of the geometry is marked as needing an update, and the vertex normals are recomputed to ensure correct lighting calculations.
// The function is called in a loop to create the animation effect.
function animate() {
    //code goes here
}


var gui;
// The buildGui function creates a graphical user interface (GUI) using the dat.GUI library.
// It initializes the GUI and adds controls for modifying the color of the material and the velocity of the animation.
// The color control allows the user to select a color, which updates the material_tissue color when changed.
function buildGui() {
    //code goes here
}

// The bounce function creates a bouncing effect for a 3D object by modifying its z-coordinate based on a sine function.
// It uses the clock to get the time delta since the last frame and updates the object's position accordingly.
// The object's z-coordinate oscillates between 1.5 and 3.5, creating a bouncing effect.
function bounce(object) {
    //code goes here
}

//final update loop
var updateLoop = function() {
    bounce(sphere);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animate();
};