/* global THREE, cube, scene, camera, renderer */

//Final animation function
function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

//Define a function to select and move the PLY
var rayCaster = new THREE.Raycaster();
var selectedObj = false;

//Define a function to select/drop a PLY object 
function onDocumentMouseDown(event) {

}