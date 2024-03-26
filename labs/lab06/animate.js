/* global THREE, cube, scene, camera, renderer */

// Continuous animation required for re-rendering
function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

//Define a function to select and move the PLY
// Use RayCaster to determine intersection of mouse with the PLY
var rayCaster = new THREE.Raycaster();
var selectedObj = false;

function onDocumentMouseDown(event) {

    //TO-DO code goes here
    
}