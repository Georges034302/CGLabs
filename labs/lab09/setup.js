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

//Step 1: update the function createCamera in setup.js to create 36 cameras
function createCamera() {
    var mycamera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);   
    mycamera.position.set(0,0,15);
    mycamera.lookAt(0,0,1);
    var cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
    mycamera.add(cameralight);
    return mycamera;
}


function createRenderer() {
    var myrenderer = new THREE.WebGLRenderer({ antialias: true });
    myrenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(myrenderer.domElement);
    return myrenderer;
}