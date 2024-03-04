const speed = 0.003;

//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_earth() {
    requestAnimationFrame(animate_earth);
    earth.rotation.y += speed;
    renderer.render(scene, camera);
}

const d = 12;
var alpha = 0;
var dalpha = 2*Math.PI/1000;

function animate_moon(){
    requestAnimationFrame(animate_moon);
    moon.position.y = 1;
    alpha +=dalpha;
    moon.position.x = d*Math.cos(alpha);
    moon.position.z = -d*Math.sin(alpha);
    renderer.render(scene, camera);
}