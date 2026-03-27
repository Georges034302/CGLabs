//Declare the system variables
var scene;      // stores all 3D objects (Sun, Earth, Moon)
var camera;     // defines what part of the scene we see
var renderer;   // responsible for drawing graphics on screen
var controls;   // handles mouse interaction (orbit + zoom)

/* -----------------------------------------------------------
   Lab 6: Declare raycasting variables
   - rayCaster detects which object is clicked
   - mouse stores the normalized mouse coordinates
   - selectedObj tracks whether the spaceship is selected
   - movePlane defines the plane where the PLY will be dropped.
----------------------------------------------------------- */
var rayCaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var selectedObj = null;
var movePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // z = 0 plane

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
    camera.position.set(10, 10, 300); // position camera so objects are visible
    camera.lookAt(0, 0, 0); // aim camera toward scene center
    renderer = new THREE.WebGLRenderer({ antialias: true }); // create renderer using GPU with smoother edges
    renderer.setPixelRatio(window.devicePixelRatio); // improve clarity on high-resolution screens
    renderer.setSize(window.innerWidth, window.innerHeight); // make renderer fill entire browser window

    /* Lab 5: Enable shadow rendering */
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement); // attach renderer canvas to HTML page

    // enable mouse orbit and zoom controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; // allow mouse wheel zooming
    controls.minDistance = 2; // prevent zooming too close
    controls.maxDistance = 50; // prevent zooming too far
    controls.enableDamping = true; // enable smooth camera inertia motion
    controls.dampingFactor = 0.08; // control how quickly camera movement slows
    controls.enablePan = false; // disable camera panning (left/right/up/down)

    /* -----------------------------------------------------------
       Lab 6: Register mouse click event for raycasting
       - when the user clicks, test object selection/movement
    ----------------------------------------------------------- */
   // add event listener for mouse clicks
   document.addEventListener('mousedown', onDocumentMouseDown, false);
}

/* -----------------------------------------------------------
   Lab 6: Define mouse picking function
   - convert mouse position to normalized device coordinates
   - cast a ray from the camera through the mouse position
   - if the spaceship is clicked, select it
   - if another object is clicked while spaceship is selected,
     move the spaceship to the clicked point
----------------------------------------------------------- */
function onDocumentMouseDown(event) {
  // Lab 6 on click function will go here
   mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // convert mouse x to NDC
   mouse.y = - (event.clientY / window.innerHeight) * 2 + 1; // convert mouse y to NDC
   rayCaster.setFromCamera(mouse, camera); // cast ray from camera through mouse position

   if (!selectedObj) {
      if (!loaded_mesh)  return

      var shipHits = rayCaster.intersectObject(loaded_mesh, true); // check if spaceship is clicked
      if (shipHits.length > 0) {
         selectedObj = loaded_mesh; // select spaceship
         selectedObj.material.color.set(0xff0000); // change color to indicate selection
      }
   }
   else {
      var dropPoint = new THREE.Vector3();
      var ok = rayCaster.ray.intersectPlane(movePlane, dropPoint); // find intersection with move plane

      if (ok) {
         selectedObj.position.copy(dropPoint); // move spaceship to clicked point
         selectedObj.material.color.set(0xffffff); // reset color
         selectedObj = null; // deselect spaceship
      }
   }
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