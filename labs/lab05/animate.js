//Define a function to animate the earth object to spin at 0.005 speed

const speed = 0.003;
//Animate a sphere to rotate around y axis
function animate_earth() {
    earth.rotation.y += speed;
    renderer.render(scene, camera);
    requestAnimationFrame(animate_earth);
}
