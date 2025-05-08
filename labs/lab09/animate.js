
var speed = 0.005;

//rotateKnot function rotates the torusKnot object around its x, y, and z axes
//by a small amount defined by the speed variable. This creates a continuous rotation effect.
function rotateKnot(){
    torusKnot.rotation.x+=speed;
    torusKnot.rotation.y+=speed;
    torusKnot.rotation.z+=speed;
}

//final update loop
function animate() {
    rotateKnot();
    renderer.render(scene, camera);    
    requestAnimationFrame(animate);
};

