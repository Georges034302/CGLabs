/* global THREE */
//Declare System Variables
var scene = new THREE.Scene();
var renderer;
var camera;
var num_cam = 6;
const cameras = [];

var width_cam = (window.innerWidth / num_cam) * window.devicePixelRatio;
var height_cam = (window.innerHeight / num_cam) * window.devicePixelRatio;
var ratio = window.innerWidth / window.innerHeight;

/*
 * Update the function to complete the following steps:
 * createCamera function creates an array of cameras for a multi-camera setup in a 3D scene using THREE.js.
 * It creates a grid of cameras based on the num_cam variable, which defines the number of cameras in each direction (x and y).
 * Each camera is a PerspectiveCamera with a field of view of 45 degrees, and it is positioned in a grid layout.
 * The cameras are set to look at the origin (0, 0, 0) and have a viewport that corresponds to their position in the grid.
 * The function returns an ArrayCamera that contains all the created cameras.
 * The cameras are positioned in a grid layout, with each camera having a specific viewport size and position.
 * The cameras are positioned at a distance of 4 units from the origin along the z-axis, and they are rotated to look at the origin.
 * The cameras are added to an ArrayCamera, which allows for rendering from multiple perspectives simultaneously.
 * A point light is also added to the ArrayCamera to illuminate the scene.
 * The ArrayCamera is then returned as the main camera for the scene.
 */
function createCamera() {
    for (let y = 0; y < num_cam; y++) {
        for (let x = 0; x < num_cam; x++) {
            const subcamera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
            subcamera.viewport = new THREE.Vector4(
                Math.floor(x * width_cam),
                Math.floor(y * height_cam),
                Math.ceil(width_cam),
                Math.ceil(height_cam)
             );

                subcamera.position.x = (x *5) - 0.05;
                subcamera.position.y = (y *5) - 0.05;
                subcamera.position.z = 4;
                subcamera.position.multiplyScalar(2);
                subcamera.lookAt(0, 0, 0);
                subcamera.updateMatrixWorld();
                cameras.push(subcamera);
        }}
    const arrayCamera = new THREE.ArrayCamera(cameras);
    arrayCamera.position.z = 3;
    var cameraLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
    arrayCamera.add(cameraLight);
    return arrayCamera;
}

/*
 * 
 * createRenderer function creates a WebGL renderer using THREE.js.
 * The function returns the created renderer object.
 * The renderer is created with antialiasing enabled to improve the visual quality of the rendered scene.
 * The renderer's size is set to the current window dimensions, ensuring that it fills the entire screen.
 * The renderer's DOM element is appended to the document body, making it visible in the web page.
 * The renderer is used to render the 3D scene and camera, allowing for real-time rendering of the objects in the scene.
 */
function createRenderer() {
    var myrenderer = new THREE.WebGLRenderer({ antialias: true });
    myrenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(myrenderer.domElement);
    return myrenderer;
}


//Resize the scene and update the camera aspect to the screen ration
// var resizeScene = function() {
//     var width = window.innerWidth;
//     var height = window.innerHeight;
//     ratio = width / height;

//     width_cam = (width / num_cam) * window.devicePixelRatio;
//     height_cam = (height / num_cam) * window.devicePixelRatio;

//     camera.aspect = ratio;
//     camera.updateProjectionMatrix();

//     for (let y = 0; y < num_cam; y++) {
//         for (let x = 0; x < num_cam; x++) {
//             const subcamera = camera.cameras[num_cam * y + x];
//             subcamera.viewport.set(
//                 Math.floor(x * width_cam),
//                 Math.floor(y * height_cam),
//                 Math.ceil(width_cam),
//                 Math.ceil(height_cam));
//             subcamera.aspect = ratio;
//             subcamera.updateProjectionMatrix();
//         }
//     }
//     renderer.setSize(window.innerWidth, window.innerHeight);
// };