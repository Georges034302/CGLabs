//Declare the system variables
var scene;      // stores all 3D objects (Sun, Earth, Moon)
var camera;     // defines what part of the scene we see
var renderer;   // responsible for drawing graphics on screen
var controls;   // handles mouse interaction (orbit + zoom)

/* Define the setup screen function
 * Setup the 3 main components: scene, camera, renderer
 * - setup the scene ratio to entire window
 * - create a perspective camera
 * - create a WebGl renderer
 * - append the renderer to the HTML document body
 * - add controls to the scene (mouse zoom + orbit)
 */
function setScene() {
    scene = new THREE.Scene(); // create a new empty 3D scene
    var ratio = window.innerWidth / window.innerHeight; // calculate screen aspect ratio
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000); // create perspective camera with FOV and clipping planes
    camera.position.set(10, 10, 30); // position camera so objects are visible
    camera.lookAt(0, 0, 0); // aim camera toward scene center
    renderer = new THREE.WebGLRenderer({ antialias: true }); // create renderer using GPU with smoother edges
    renderer.setPixelRatio(window.devicePixelRatio); // improve clarity on high-resolution screens
    renderer.setSize(window.innerWidth, window.innerHeight); // make renderer fill entire browser window
    document.body.appendChild(renderer.domElement); // attach renderer canvas to HTML page
    // enable mouse orbit and zoom controls
    // allow mouse wheel zooming
    // prevent zooming too close
    // prevent zooming too far
    // enable smooth camera inertia motion
    // control how quickly camera movement slows
}

/* Define the resize screen function
 * - setup the scene width and height to the entire window
 * - setup the renderer size to the width and height
 * - set the camera ratio to width / height
 * - update the camera projection matrix
 * - render the view (scene, camera)
 */
var resizeScene = function() {
    var width = window.innerWidth; // get updated window width
    var height = window.innerHeight; // get updated window height
    renderer.setSize(width, height); // update renderer size
    camera.aspect = width / height; // update camera aspect ratio
    camera.updateProjectionMatrix(); // apply camera projection changes
    renderer.render(scene, camera); // redraw scene after resize
};