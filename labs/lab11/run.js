// LAB 8: Define the main run function to start the lab
/* Define the run function
 * - setup the scene (scene, camera, renderer, controls)
 * - build and add shapes (Sun, Earth, Moon)
 * - attach resize event handler
 * - render the first frame
 * - start the animation loop
 */
function run() { // entry point for the lab
    if (typeof applyLab8CompatibilityShims === "function") {
        applyLab8CompatibilityShims(); // LAB 8: install runtime compatibility aliases once
    }

    setScene(); // create scene, camera, renderer, controls
    setupLab11Input(); // LAB 11: register keyboard controls (Arrows + Q/W + Space + Tab restart)
    addShapes(); // add Sun, Earth, Moon to the scene

    // LAB 11: use scripted follow camera by default (students can re-enable if desired)
    controls.enabled = false;

    // LAB 11: reset gameplay timers/state before first frame
    gameState = "playing";
    fireTimer = 0;

    window.addEventListener("resize", resizeScene); // resize canvas + camera on window resize
    renderer.render(scene, camera); // draw the first frame (before animation starts)
    animate(); // start the single animation loop
}
run(); // call run() to start everything