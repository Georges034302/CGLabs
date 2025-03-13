const speed = 0.003;


/* Define a function to animate the moon group
 * - apply rotation to all moons in the collection
 * - rotate the group on y-axis using +speed
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function animate_moons(){
    // code goes here
}

/* Define a function to randomize object color
 * - set initial color for an object
 * - randomize the HEX color for an object
 * - update the object material color
 */
function change_color(object){
    // code goes here
}

/* Define a function to animate the random color change and control the FPS
 * - apply color change to the moon group
 * - render the view (scene, camera)
 * - Slow down the FPS (by controlling the requestAnimationFrame call)
 */
function animate_color() {
    //code goes here      
    
}


//use THREE current clock to animate the earth bounce
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

/* Define a function to bounce the earth sphere
 * - set the delta factor to the current time delta
 * - update the time factor by the clock delta
 * - rotate the earth on x axis by time * 4
 * - rotate the earth on y-axis by 0.5 + Math.abs(Math.sin(time * 3)) * 5;
 * - rotate the earth on z-axis by Math.cos(time) * 10;
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function bounce() {
    // code goes here
}