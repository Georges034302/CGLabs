
var speed = 0.005;

//Step 3: animate the knots to rotate around all axis with speed 0.005
function rotateKnot(){
   
}

//final update loop
function animate() {
    rotateKnot();
    renderer.render(scene, camera);    
    requestAnimationFrame(animate);
};

