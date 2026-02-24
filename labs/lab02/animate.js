
// Define rotation speed constant = 0.005
/* Define the animate earth function
 * - update the earth y-rotation with the rotation speed constant
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
const speed = 0.005;
function animate_earth() {
    // code goes here
    earth.rotation.y += speed;
    renderer.render(scene,camera);
    requestAnimationFrame(animate_earth);
}


// Define earth-moon distance d = 5
// define the initial angle alpha = 0
// define the angle update dalpha = 2 * Math.PI / 1000;

/* Define the animate moon function
 * - update the alpha angle with dalpha with every frame animation
 * - fix the moon y position to 1
 * - update the moon x position to d * Math.cos(alpha);
 * - update the moon z position to d * Math.sin(alpha);
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
const d = 5;
var alpha = 0;
var dalpha = 2 * Math.PI / 1000;

function animate_moon() {
    // code goes here
    alpha += dalpha;
    moon.position.y = 1;
    moon.position.x = d * Math.cos(alpha);
    moon.position.z = d * Math.sin(alpha);
    renderer.render(scene,camera);
    requestAnimationFrame(animate_moon);
}