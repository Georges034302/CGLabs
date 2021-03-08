/*
//Animate a cube to rotate around: x, and y axis
function animate_cube() {
    
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.04;
    cube.position.z = 1;
   
    renderer.render(scene, camera);
    requestAnimationFrame(animate_cube);
}

var clock = new THREE.Clock();
var time = 0;
var delta = 0;
//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_sphere() {
    
    delta = clock.getDelta();
    time += delta;

    sphere.rotation.x = time*4;
    sphere.position.y = 0.5*Math.abs(Math.sin(time*3))*2;
    sphere.position.z = -1+Math.cos(time)*4;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate_sphere);
}
*/



const speed = 0.005;

function animate_earth(){
    earth.rotation.y += speed;
    renderer.render(scene,camera);
    requestAnimationFrame(animate_earth);
}
// x = d*cos(angle)
// z = d*sin(angle)

const d = 5;
var alpha = 0;
var dalpha = 2*Math.PI/1000;

function animate_moon(){
    alpha += dalpha;

    moon.position.y = 1;
    moon.position.x = -d*Math.cos(alpha);
    moon.position.z = d*Math.sin(alpha);
    renderer.render(scene,camera);
    requestAnimationFrame(animate_moon);
}