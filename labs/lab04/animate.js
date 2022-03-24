/* global THREE, cube, scene, camera, renderer */

const speed = 0.02;

function rotate(object) {
    object.rotation.x += 0.01;
    object.rotation.z += 0.01;
}

function animate() {
    renderer.render(scene, camera);
    cubes.forEach(rotate);
    group.rotation.y += 0.01;
    controls.update();
    requestAnimationFrame(animate);
}