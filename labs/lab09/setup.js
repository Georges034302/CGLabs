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
    for(let y = 0; y < num_cam; y++){
        for(let x = 0; x < num_cam; x++){
            const subcamera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
            subcamera.viewport =new THREE.Vector4(
                Math.floor(x * width_cam),
                Math.floor(y * height_cam),
                Math.ceil(width_cam),
                Math.ceil(height_cam)
            );
            subcamera.position.x = (x*5) - 0.5;
            subcamera.position.y = (y*5) - 0.5;
            subcamera.position.z = 4;
            subcamera.position.multiplyScalar(2);
            subcamera.lookAt(0,0,0);
            subcamera.updateMatrixWorld();
            cameras.push(subcamera);
        }
    }

    var mycamera = new THREE.ArrayCamera(cameras);
    mycamera.position.z = 3;
    
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