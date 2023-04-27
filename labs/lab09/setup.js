/* global THREE */
//Declare Systen Variables
var scene = new THREE.Scene();
var renderer;
var camera;
var ratio = window.innerWidth / window.innerHeight;

//Step 1: Declare the mirror variables
//Define the number of cameras
//Define an array of cameras
//Define the cam width based on the window ratios and number of cameras
//Define the cam height based on the window ratios and number of cameras


//Step2: Update this function to return an array of cameras
function createCamera() {
    //add a collections of cameras to the array
    //specify the viewport for each camera in the collection
    //specify the position for each camera in the collection

    var mycamera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    mycamera.position.set(0, 0, 15);
    mycamera.lookAt(0, 0, 1);
    mycamera.position.z = 15;
    var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
    mycamera.add(cameralight);
    return mycamera;
}
camera = createCamera();

function createRenderer() {
    var myrenderer = new THREE.WebGLRenderer({ antialias: true });
    myrenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(myrenderer.domElement);
    return myrenderer;
}
renderer = createRenderer();

//Step 3: update this function to set the viewport for each camera in the array in the resize matrix
var resizeScene = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    ratio = width / height;
    camera.aspect = ratio;

    //Define the cam width based on the window ratios and number of cameras
    //Define the cam height based on the window ratios and number of cameras
    //specify the viewport for each camera in the collection
    //specify the position for each camera in the collection
    //set the aspect for each camera in the array
    //update the projection matrix for each camera in the array

    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};