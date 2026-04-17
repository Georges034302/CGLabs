/* global THREE */
//Declare System Variables

//variables declared here -
var scene, camera, renderer;
var textureLoader;
var backgroundMaterial;
var backgroundMesh;
var ghostSprite;
var marioOverlay;
var clock;
var scrollOffset = 0;
var backgroundRotation = 0;
var marioBaseX = 0;
var marioGroundY = 0;
var marioFlyY = 0;
var marioBaseY = 0;
var ghostBaseY = 0;
var ghostBaseX = -13.8;
var ghostCurrentX = 0;
var ghostCurrentY = 0;
var animatedVideos = [];
var ghostVideo = null;

function updateCharacterBasePositions() {
    var marioDepth = camera.position.z - 1;
    var viewportHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * marioDepth;
    var viewportWidth = viewportHeight * camera.aspect;

    marioGroundY = (-viewportHeight * 0.5) + 3;
    marioFlyY = viewportHeight * 0.25;
    marioBaseY = marioGroundY;
    ghostBaseY = 0;
    ghostBaseX = (-viewportWidth * 0.42) - 1;

    if (ghostCurrentX === 0 && ghostCurrentY === 0) {
        ghostCurrentX = ghostBaseX;
        ghostCurrentY = ghostBaseY;
    }
}

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
    updateCharacterBasePositions();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.zIndex = '0';
    document.body.appendChild(renderer.domElement);

    textureLoader = new THREE.TextureLoader();
    clock = new THREE.Clock();
    marioOverlay = document.getElementById('marioOverlay');
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
    updateCharacterBasePositions();

    if (backgroundMaterial) {
        backgroundMaterial.map.repeat.x = 1;
        backgroundMaterial.map.needsUpdate = true;
    }

    if (backgroundMesh) {
        updateBackgroundSize();
    }

    renderer.render(scene, camera);
};