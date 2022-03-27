/* global THREE, cube, scene, camera, renderer */

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

//Define a function to select and move the PLY