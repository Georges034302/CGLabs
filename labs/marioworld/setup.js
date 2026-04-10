/* global THREE */
//Declare System Variables

//variables declared here -
var scene, camera, renderer;
var textureLoader;
var backgroundMaterial;
var marioSprite;
var ghostSprite;
var clock;
var scrollOffset = 0;
var marioBaseY = -4.5;
var ghostBaseY = -2.7;
var ghostBaseX = -6;
var animatedVideos = [];

/* Define the setup screen function
 * Setup the 3 main components: scene, camera, renderer
 * - setup the scene ratio to entire window
 * - create a perspective camera
 * - create a WebGl renderer
 * - append the renderer to the HTML document body
 */
function setScene() {
    scene = new THREE.Scene();
    var ratio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    camera.position.set(0, 0, 18);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    document.body.appendChild(renderer.domElement);

    textureLoader = new THREE.TextureLoader();
    clock = new THREE.Clock();
}

/* Define the resize screen function
 * - setup the scene width and height to the entire window
 * - setup the renderer size to the width and height
 * - set the camera ratio to width / height
 * - update the camera projection matrix
 * - render the view (scene, camera)
 */
var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (backgroundMaterial) {
        backgroundMaterial.map.repeat.x = camera.aspect * 1.6;
        backgroundMaterial.map.needsUpdate = true;
    }

    renderer.render(scene, camera);
};