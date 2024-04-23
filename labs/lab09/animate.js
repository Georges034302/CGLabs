
var speed = 0.005;

//Step 3: animate the knots to rotate around all axis with speed 0.005
function rotateKnot(){
   torusKnot.rotation.x += speed;
   torusKnot.rotation.y += speed;
   torusKnot.rotation.z += speed;
}

//final update loop
function animate() {
    rotateKnot();
    renderer.render(scene, camera);    
    requestAnimationFrame(animate);
};

