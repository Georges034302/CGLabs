
var speed = 0.05;

//knot rotation 
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

