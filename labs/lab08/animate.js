//final update loop - animate the GUI
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};