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

    /* LAB 5: Enable shadow rendering */
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
         LAB 6: Register mouse click event for raycasting
         - when the user clicks, test object selection/movement
     ----------------------------------------------------------- */
    document.addEventListener("mousedown", onDocumentMouseDown, false);
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

/* -----------------------------------------------------------
   LAB 6: Declare raycasting variables
   - rayCaster detects which object is clicked
   - mouse stores the normalized mouse coordinates
   - selectedObj tracks whether the spaceship is selected
   - movePlane defines the plane where the PLY will be dropped
----------------------------------------------------------- */
var rayCaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var selectedObj = null;
var movePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // z = 0 plane

/* -----------------------------------------------------------
    LAB 6: Define mouse picking function
   - convert mouse position to normalized device coordinates
   - cast a ray from the camera through the mouse position
   - if the spaceship is clicked, select it
   - if another object is clicked while spaceship is selected,
     move the spaceship to the clicked point
 ----------------------------------------------------------- */
function onDocumentMouseDown(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mouse, camera);

    // FIRST CLICK: try to select the UFO only
    if (!selectedObj) {
        if (!loaded_mesh) return;

        var shipHits = rayCaster.intersectObject(loaded_mesh, true);

        if (shipHits.length > 0) {
            selectedObj = loaded_mesh;
            selectedObj.material.color.set(0xff0000); // selected = red
        }
    }

    // SECOND CLICK: move selected UFO to the z=0 plane
    else {
        var dropPoint = new THREE.Vector3();
        var ok = rayCaster.ray.intersectPlane(movePlane, dropPoint);

        if (ok) {
            selectedObj.position.copy(dropPoint);
            selectedObj.material.color.set(0xffffff); // restore colour
            selectedObj = null;
        }
    }
}

/* -----------------------------------------------------------
   LAB 8: Three.js compatibility shims
   - keep legacy lab loaders working on newer Three.js builds
   - avoids editing files inside js/
----------------------------------------------------------- */
var lab8CompatibilityShimsApplied = false;

function applyLab8CompatibilityShims() {
    if (lab8CompatibilityShimsApplied) return;

    if (THREE && THREE.Quaternion && THREE.Quaternion.prototype) {
        THREE.Quaternion.prototype.inverse = function() {
            return this.invert();
        };
    }

    if (THREE && THREE.BufferGeometry && THREE.BufferGeometry.prototype) {
        THREE.BufferGeometry.prototype.addAttribute = function(name, attribute) {
            return this.setAttribute(name, attribute);
        };
    }

    if (THREE && THREE.FileLoader) {
        THREE.XHRLoader = THREE.FileLoader;
    }

    if (THREE && THREE.Loader && THREE.DefaultLoadingManager) {
        if (!THREE.Loader.Handlers) {
            THREE.Loader.Handlers = {};
        }

        THREE.Loader.Handlers.get = function(file) {
            if (THREE.DefaultLoadingManager.getHandler) {
                return THREE.DefaultLoadingManager.getHandler(file) || null;
            }
            return null;
        };

        THREE.Loader.Handlers.add = function(regex, loader) {
            if (THREE.DefaultLoadingManager.addHandler) {
                THREE.DefaultLoadingManager.addHandler(regex, loader);
            }
        };
    }

    if (THREE && THREE.Material && THREE.Material.prototype) {
        function defineShadingAlias(proto) {
            if (!proto) return;
            if (Object.prototype.hasOwnProperty.call(proto, "shading")) return;

            Object.defineProperty(proto, "shading", {
                get: function() {
                    return this.flatShading ? THREE.FlatShading : THREE.SmoothShading;
                },
                set: function(value) {
                    this.flatShading = (value === THREE.FlatShading || value === 1);
                }
            });
        }

        defineShadingAlias(THREE.MeshPhongMaterial && THREE.MeshPhongMaterial.prototype);
        defineShadingAlias(THREE.MeshLambertMaterial && THREE.MeshLambertMaterial.prototype);
        defineShadingAlias(THREE.MeshStandardMaterial && THREE.MeshStandardMaterial.prototype);
    }

    lab8CompatibilityShimsApplied = true;
}

/* -----------------------------------------------------------
   LAB 11: Player input state and movement tuning
   - inputState stores key press states across frames
   - movement constants are reused in animate.js
----------------------------------------------------------- */
var inputState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    rise: false,
    descend: false,
    fire: false
};

var shipMoveSpeed = 18; // units per second
var shipTurnSpeed = 1.9; // radians per second
var shipVerticalSpeed = 12; // units per second
var shipVerticalLimit = 12; // symmetric vertical range: -limit to +limit

/* -----------------------------------------------------------
   LAB 11: Third-person follow camera tuning
   - camera offset is defined in ship local space
   - look offset keeps aim slightly above the ship origin
   - smoothing blends camera movement instead of snapping
----------------------------------------------------------- */
var followOffset = new THREE.Vector3(-24, 11, 0);
var lookOffset = new THREE.Vector3(0, 2.6, 0);
var followSmoothing = 0.22;
var followDistanceMultiplier = 2.0; // keep chase camera twice as far from the ship

/* -----------------------------------------------------------
   LAB 11: Handle keyboard press/release events
    - maps Arrow keys for flight direction + Q/W for altitude + Space to fire
    - Tab requests restart after victory
   - prevents browser scroll when Space is used for firing
----------------------------------------------------------- */
function onLab11KeyChange(event, isPressed) {
    if (event.code === "ArrowUp") inputState.forward = isPressed;
    if (event.code === "ArrowDown") inputState.backward = isPressed;
    if (event.code === "ArrowLeft") inputState.left = isPressed;
    if (event.code === "ArrowRight") inputState.right = isPressed;
     if (event.code === "KeyQ") inputState.rise = isPressed;
     if (event.code === "KeyW") inputState.descend = isPressed;

    // Prevent browser scrolling when arrow keys are used for ship control.
    if (
        event.code === "ArrowUp" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowLeft" ||
        event.code === "ArrowRight"
    ) {
        event.preventDefault();
    }

    if (event.code === "Space") {
        inputState.fire = isPressed;
        event.preventDefault();
    }

    // Tab is used as a gameplay restart key after Galactus is defeated.
    if (event.code === "Tab") {
        event.preventDefault();
        if (isPressed && typeof requestLab11Restart === "function") {
            requestLab11Restart();
        }
    }
}

/* -----------------------------------------------------------
   LAB 11: Register gameplay input listeners
   - called once from run() after scene setup
----------------------------------------------------------- */
function setupLab11Input() {
    document.addEventListener("keydown", function(event) {
        onLab11KeyChange(event, true);
    });

    document.addEventListener("keyup", function(event) {
        onLab11KeyChange(event, false);
    });
}

