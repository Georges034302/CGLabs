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
function spin() {

}