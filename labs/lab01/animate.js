function animate_cube(){
    cube.rotation.x += 0.05;
    cube.position.z = 2;
    requestAnimationFrame(animate_cube);
    renderer.render(scene,camera);
}

function animate_sphere(){
    requestAnimationFrame(animate_sphere);
    sphere.rotation.x += 0.004;
    sphere.rotation.y += 0.003;
    sphere.position.z = 0;
    renderer.render(scene,camera);
}