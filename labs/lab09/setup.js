/* global THREE */
//Declare Systen Variables
var scene = new THREE.Scene();
var renderer ;
var camera;
var num_cam = 6;
const cameras = [];

var width_cam = ( window.innerWidth / num_cam ) * window.devicePixelRatio;
var height_cam = ( window.innerHeight / num_cam ) * window.devicePixelRatio;
var ratio = window.innerWidth / window.innerHeight; 

//Setup the 3 main components: scene, camera, renderer
function createCamera() {  	
    for ( let y = 0; y < num_cam; y ++ ) {
		for ( let x = 0; x < num_cam; x ++ ) {
			const subcamera = new THREE.PerspectiveCamera( 45, ratio, 0.1, 1000 );
			subcamera.viewport = new THREE.Vector4( Math.floor( x * width_cam ), 
													Math.floor( y * height_cam ),
												    Math.ceil( width_cam ), 
													Math.ceil( height_cam ) );

			subcamera.position.x = (x*5) - 0.5;
			subcamera.position.x = (y*5) - 0.5;
			subcamera.position.z = 4;
			subcamera.position.multiplyScalar( 2 );
			subcamera.lookAt( 0, 0, 0 );
			subcamera.updateMatrixWorld();
			cameras.push( subcamera );
		}
	}
	var mycamera = new THREE.ArrayCamera( cameras );
	mycamera.position.z = 3;
    var cameralight = new THREE.PointLight( new THREE.Color(1,1,1), 1 );
    mycamera.add( cameralight ); 		
	return mycamera;	
}
camera = createCamera();

function createRenderer(){
	var myrenderer =  new THREE.WebGLRenderer({antialias:true});	
    myrenderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(myrenderer.domElement);  
	return myrenderer;	
}
renderer = createRenderer();

//Resize the scene and update the camera aspect to the screen ration
var resizeScene = function() {
	var width = window.innerWidth;
    var height = window.innerHeight;
    ratio = width/height;
	console.log("Ratio "+ratio); 
    width_cam = ( width / num_cam ) * window.devicePixelRatio;
	height_cam = ( height / num_cam ) * window.devicePixelRatio;
		
	camera.aspect = ratio;	
	camera.updateProjectionMatrix();
	
	for ( let y = 0; y < num_cam; y ++ ){
		for ( let x = 0; x < num_cam; x ++ ){
			const subcamera = camera.cameras[ num_cam * y + x ];
			subcamera.viewport.set(
					Math.floor( x * width_cam ),
					Math.floor( y * height_cam ),
					Math.ceil( width_cam ),
					Math.ceil( height_cam ) );
			subcamera.aspect = ratio;
			subcamera.updateProjectionMatrix();
		}
	}
	renderer.setSize( window.innerWidth, window.innerHeight ); 
};

