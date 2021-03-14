/* global THREE, cube, scene, camera, renderer */

const speed = 0.01;

function rotate(object) {
    object.rotation.x += 2 * speed;
    object.rotation.z += 2 * speed;
}

function animate() {
    renderer.render(scene, camera);
    cubes.forEach(rotate);
    group.rotation.y += speed;
    controls.update();
    requestAnimationFrame(animate);
}