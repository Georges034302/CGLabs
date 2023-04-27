/* global THREE */
//Declare Systen Variables
var scene = new THREE.Scene();
var renderer;
var camera;
var ratio = window.innerWidth / window.innerHeight;

//Step 1: Declare the mirror variables
//Define the number of cameras
var num_cam = 6;
//Define an array of cameras
const cameras = [];
//Define the cam width based on the window ratios and number of cameras
var width_cam = (window.innerWidth/num_cam)*window.devicePixelRatio;
//Define the cam height based on the window ratios and number of cameras
var height_cam = (window.innerHeight/num_cam)*window.devicePixelRatio;


//Step2: Update this function to return an array of cameras
function createCamera() {
    //add a collections of cameras to the array
    //specify the viewport for each camera in the collection
    //specify the position for each camera in the collection
    for(let y=0; y < num_cam;y++){
        for(let x=0; x <num_cam; x++){
            const subcam = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
            subcam.viewport = new THREE.Vector4(Math.floor(x*width_cam),
                                                Math.floor(y*height_cam),
                                                Math.ceil(width_cam), 
                                                Math.ceil(height_cam));
            
            subcam.position.x = (x*5) - 0.5;
            subcam.position.y = (y*5) - 0.5;
            subcam.position.z = 5;
            subcam.position.multiplyScalar(2);
            subcam.lookAt(0,0,0);
            subcam.updateMatrixWorld();
            cameras.push(subcam);
        }
    }

    var mycamera = new THREE.ArrayCamera(cameras);
    mycamera.position.z = 5;
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

    var width_cam = (window.innerWidth/num_cam)*window.devicePixelRatio;
    var height_cam = (window.innerHeight/num_cam)*window.devicePixelRatio;

    camera.aspect = ratio;
    camera.updateProjectionMatrix();
    //Define the cam width based on the window ratios and number of cameras
    //Define the cam height based on the window ratios and number of cameras
    //specify the viewport for each camera in the collection
    //specify the position for each camera in the collection
    //set the aspect for each camera in the array
    //update the projection matrix for each camera in the array
    for(let y=0; y < num_cam;y++){
        for(let x=0; x <num_cam; x++){
            const subcam = camera.cameras[num_cam*y + x];
            subcam.viewport.set(Math.floor(x*width_cam),
                                Math.floor(y*height_cam),
                                Math.ceil(width_cam), 
                                Math.ceil(height_cam));
            subcam.aspect = ratio;
            subcam.updateProjectionMatrix();
        }
    }
    renderer.setSize(width, height);
};