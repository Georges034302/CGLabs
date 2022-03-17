/* global THREE, cube, scene, camera, renderer */

const speed = 0.02;

function rotate(object) {
    //Add the object rotation code here
}

function animate() {
    renderer.render(scene, camera);
    //Rotate all cubes
    //Rotate the group around the Y axis
    controls.update();
    requestAnimationFrame(animate);
}