/* global THREE, cube, scene, camera, renderer */

const speed = 0.02;

function rotate(object) {
    object.rotation.x += speed;
    object.rotation.z += speed;
}

function animate() {
    renderer.render(scene, camera);
    cubes.forEach(rotate);
    group.rotation.y += speed;
    controls.update();
    requestAnimationFrame(animate);
}