const speed = 0.003;

var clock = new THREE.Clock();
var time = 0;
var delta = 0;

//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_earth() {
    delta = clock.getDelta();
    time += delta;

    earth.position.y = 10*Math.abs(Math.sin(time*4));
    earth.position.z = 20*Math.cos(time);
    requestAnimationFrame(animate_earth);
    renderer.render(scene, camera);
}
