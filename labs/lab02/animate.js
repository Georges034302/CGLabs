//Animate a cube to rotate around: x, and y axis
// function animate_cube() {
//     requestAnimationFrame(animate_cube);
//     cube.rotation.x += 0.04;
//     cube.rotation.y += 0.04;
//     cube.position.z = 3;
//     renderer.render(scene, camera);
// }

const speed = 0.005;

//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_earth() {
    requestAnimationFrame(animate_earth);
    earth.rotation.y += speed;

    renderer.render(scene, camera);
}

const d = 5;
var alpha = 0;
var dalpha = 2*Math.PI/1000;

function animate_moon(){
    requestAnimationFrame(animate_moon);
    moon.position.y = 1;
    alpha +=dalpha;
    moon.position.x = d*Math.cos(alpha);
    moon.position.z = d*Math.sin(alpha);
    renderer.render(scene, camera);
}