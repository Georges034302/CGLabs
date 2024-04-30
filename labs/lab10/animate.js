const r = 100;
var alpha = 0;
var dalpha = 2 * Math.PI / 200;

//final loop
function animate() {
    spin();
    requestAnimationFrame(animate);
}
animate();

//render and animate the cloud
//animate the cloud around x and z axis (circular motion)
//HINT: to animate the cloud, animate every point in the cloud
function spin() {
    alpha += dalpha;
    var alphas = cloud.geometry.attributes.alpha;
    var count = alphas.count;

    //animating - updating every point to move towards zero
    for(var i=0; i< count; i++){
        alphas[i] *= 0.95;
        if(alphas[i] < 0.01){
            alphas[i] = 1.0;
        }
    }

    alphas.needsUpdate = true;

    //animate the cloud geometry
    cloud.position.x = -r*Math.cos(alpha);
    cloud.position.z = r*Math.sin(alpha);
    renderer.render(scene,camera);
}