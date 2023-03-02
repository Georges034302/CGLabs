//Define a function to animate the earth object to spin at 0.005 speed


//Define a function to animate the moon object to rotate around the earth
//Rotation positions x and y are determined using the distance from earth multiplied by cos and sin of alpha angle

var speed = 0.005;
function animate_earth(){
    earth.rotation.y += speed;
    renderer.render(scene,camera);
    requestAnimationFrame(animate_earth);
}

const d = 5;
var alpha = 0;
var dalpha = 2*Math.PI/1000;
function animate_moon(){
    alpha += dalpha;
    moon.position.y = 1;
    moon.position.x = d*Math.sin(alpha);
    moon.position.z = d*Math.cos(alpha);
    requestAnimationFrame(animate_moon);
}