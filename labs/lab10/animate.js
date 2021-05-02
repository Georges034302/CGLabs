//Animation factors [radius, angle, and delta-angle]
const r = 100;
var alpha = 0;
var dalpha = 2 * Math.PI / 200;

//Animation loop
function animate() {
    requestAnimationFrame(animate);
    render();
}
animate();

//Render the shader and animate its position
function render() {
    // <<<Add code here >>>
    renderer.render(scene, camera);
}