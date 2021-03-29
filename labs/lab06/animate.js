/* global THREE, cube, scene, camera, renderer */

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

//Define a raycaster from THREE to apply for intersected objects
//Define a selected object


//add event listener to the model and move the model with mouse-down position
function onDocumentMouseDown(event) {

}