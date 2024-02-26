//Animate a cube to rotate around: x, and y axis
function animate_cube() {
    requestAnimationFrame(animate_cube);
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    cube.position.z = 3;
    renderer.render(scene, camera);
}

//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_sphere() {
    requestAnimationFrame(animate_sphere);
    sphere.rotation.x += 0.004;
    sphere.rotation.y += 0.008;
    sphere.position.z = 3;

    renderer.render(scene, camera);
}