const speed = 0.005;

function animate_earth() {
    earth.rotation.y += speed;
    renderer.render(scene, camera);
    requestAnimationFrame(animate_earth);
}


const d = 5;
var alpha = 0;
var dalpha = 2 * Math.PI / 1000;

function animate_moon() {
    alpha += dalpha;
    moon.position.y = 1;
    moon.position.x = d * Math.cos(alpha);
    moon.position.z = d * Math.sin(alpha);
    renderer.render(scene, camera);
    requestAnimationFrame(animate_moon);
}