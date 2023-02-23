function animate(){
    cube1.rotation.x += 0.02;
    cube1.rotation.y += 0.03;
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}