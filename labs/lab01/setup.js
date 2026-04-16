/* global THREE */
//Declare System Variables

//variables declared here -
var scene, camera, renderer;

/* -----------------------------------------------------------
 * CORE (Labs 1-10): setScene()
 * Shared setup used across the lab sequence.
 * - initialize scene, camera, and renderer
 * - attach the renderer canvas to the page
 * - configure controls and lab-specific runtime options
 * ----------------------------------------------------------- */
function setScene() {
   // code goes here
    scene = new THREE.Scene();
    var ratio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    camera.position.set(10, 10, 15);
    camera.lookAt(0,0,5);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

/* -----------------------------------------------------------
 * CORE (Labs 1-10): resizeScene()
 * Shared resize handler used across the lab sequence.
 * - update renderer size to match the window
 * - update camera aspect/projection
 * - re-render after resize to keep the view consistent
 * ----------------------------------------------------------- */
var resizeScene = function() {
    // code goes here
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};