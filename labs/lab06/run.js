// Define the main run function to start the lab
/* Define the run function
 * - setup the scene (scene, camera, renderer, controls)
 * - build and add shapes (Sun, Earth, Moon)
 * - attach resize event handler
 * - render the first frame
 * - start the animation loop
 */
function run() { // entry point for the lab
    setScene(); // create scene, camera, renderer, controls
    addShapes(); // add Sun, Earth, Moon to the scene
    window.addEventListener("resize", resizeScene); // resize canvas + camera on window resize
    renderer.render(scene, camera); // draw the first frame (before animation starts)
    animate(); // start the single animation loop
}
run(); // call run() to start everything