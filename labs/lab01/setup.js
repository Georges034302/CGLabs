/* global THREE */
//Declare System Variables

var scene;
var camera;
var renderer;

/* Define the setup screen function
 * Setup the 3 main components: scene, camera, renderer
 * - setup the scene ratio to entire window
 * - create a perspective camera
 * - create a WebGl renderer
 * - append the renderer to the HTML document body
 */
function setScene() {
   // code goes here
   scene = new THREE.Scene();
   var ratio = window.innerWidth/window.innerHeight;
   camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
   camera.position.set(10,10,15);
   camera.lookAt(0,0,5);
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth,window.innerHeight);
   document.body.appendChild(renderer.domElement);
   
}

/* Define the resize screen function
 * - setup the scene width and height to the entire window
 * - setup the renderer size to the width and height
 * - set the camera ratio to width / height
 * - update the camera projection matrix
 * - render the view (scene, camera)
 */
var resizeScene = function() {
    // code goes here
   var width = window.innerWidth;
   var height = window.innerHeight;
   camera.aspect = width/height;
   camera.updateProjectionMatrix();
   renderer.render(scene,camera);
};