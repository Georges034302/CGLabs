// Define rotation speed constant = 0.005
/* Define the animation function
 * - update the earth y-rotation with the rotation speed constant
 * - update the earth orbit around the sun using cos/sin
 * - update the moon orbit around the earth (clockwise) using cos/sin
 * - make the moon tidally-locked to the earth (always faces earth)
 * - update the controls (required for damping)
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
const speed = 0.005; // Earth self-rotation speed (spin)
var theta = 0; // Earth orbit angle around Sun (starts at 0)
var dtheta = 2 * Math.PI / 2000; // Earth orbit angle step per frame (orbit speed)
var alpha = 0; // Moon orbit angle around Earth (starts at 0)
var dalpha = 2 * Math.PI / 1000; // Moon orbit angle step per frame (moon orbit speed)

function animate() { // main animation loop (single loop for whole scene)
    requestAnimationFrame(animate); // call animate again next frame (infinite loop)
    earth.rotation.y += speed; // rotate Earth anti-clockwise around its own Y axis
    theta += dtheta; // increase Earth orbit angle each frame
    earth.position.x = earthOrbit * Math.cos(theta); // set Earth X position (orbit around Sun)
    earth.position.z = earthOrbit * Math.sin(theta); // set Earth Z position (orbit around Sun)
    alpha -= dalpha; // decrease angle to make Moon orbit clockwise around Earth
    moon.position.x = earth.position.x + moonOrbit * Math.cos(alpha); // set Moon X relative to Earth
    moon.position.z = earth.position.z + moonOrbit * Math.sin(alpha); // set Moon Z relative to Earth
    moon.position.y = earth.position.y; // keep Moon at same height as Earth (no vertical orbit)
    moon.lookAt(earth.position); // tidal lock: rotate Moon so it always faces Earth
    controls.update(); // update OrbitControls (required when damping is enabled)
    renderer.render(scene, camera); // render one frame to the canvas
}