var speed = 0.01;

/* Define a function to rotate any object
 * - rotate on x-axis using +speed
 * - rotate on z-axis using +speed
 */
function rotate(object) {
    //code goes here
    object.rotation.x += speed;
    object.rotation.z += speed;
}

/* Define a function to animate the cubes group
 * - apply rotation to all cubes in the collection
 * - rotate the group on y-axis using +speed
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function animate() {
    //code goes here
    cubes.forEach(rotate);
    group.rotation.y += speed;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

/* Define a function to randomize object color
 * - set initial color for an object
 * - randomize the HEX color for an object
 * - update the object material color
 */
function changeColor(object) {
    //code goes here
    var color = new THREE.Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);
    object.material.color = color;
}

/* Define a function to animate the random color change and control the FPS
 * - apply color change to the group cubes
 * - render the view (scene, camera)
 * - Slow down the FPS (by controlling the requestAnimationFrame call)
 */
function animateColor() {
    //code goes here
    cubes.forEach(changeColor);
    renderer.render(scene,camera);
    setTimeout(function(){
        requestAnimationFrame(animateColor);
    },500);       
    
}