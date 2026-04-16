//Declare the system variables
var scene;      // stores all 3D objects (Sun, Earth, Moon)
var camera;     // defines what part of the scene we see
var renderer;   // responsible for drawing graphics on screen
var controls;   // handles mouse interaction (orbit + zoom)

/* -----------------------------------------------------------
 * CORE (Labs 1-10): setScene()
 * Shared setup used across the lab sequence.
 * - initialize scene, camera, and renderer
 * - attach the renderer canvas to the page
 * - configure controls and lab-specific runtime options
 * ----------------------------------------------------------- */
function setScene() {
    scene = new THREE.Scene(); // create a new empty 3D scene
    var ratio = window.innerWidth / window.innerHeight; // calculate screen aspect ratio
    camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000); // create perspective camera with FOV and clipping planes
    camera.position.set(10, 10, 300); // position camera so objects are visible
    camera.lookAt(0, 0, 0); // aim camera toward scene center
    renderer = new THREE.WebGLRenderer({ antialias: true }); // create renderer using GPU with smoother edges
    renderer.setPixelRatio(window.devicePixelRatio); // improve clarity on high-resolution screens
    renderer.setSize(window.innerWidth, window.innerHeight); // make renderer fill entire browser window
    
    //:ab 5: Enable shadow rendering in the renderer
    renderer.shadowMap.enabled = true; // enable shadow rendering in the renderer
    
    document.body.appendChild(renderer.domElement); // attach renderer canvas to HTML page
    // enable mouse orbit and zoom controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // allow mouse wheel zooming
    controls.minDistance = 2; // prevent zooming too close
    controls.maxDistance = 50; // prevent zooming too far
    controls.enableDamping = true; // enable smooth camera inertia motion
    controls.dampingFactor = 0.08; // control how quickly camera movement slows
    controls.enablePan = false; // disable camera panning (left/right/up/down)
   
}

/* -----------------------------------------------------------
 * CORE (Labs 1-10): resizeScene()
 * Shared resize handler used across the lab sequence.
 * - update renderer size to match the window
 * - update camera aspect/projection
 * - re-render after resize to keep the view consistent
 * ----------------------------------------------------------- */
var resizeScene = function() {
    var width = window.innerWidth; // get updated window width
    var height = window.innerHeight; // get updated window height
    renderer.setSize(width, height); // update renderer size
    camera.aspect = width / height; // update camera aspect ratio
    camera.updateProjectionMatrix(); // apply camera projection changes
    renderer.render(scene, camera); // redraw scene after resize
};