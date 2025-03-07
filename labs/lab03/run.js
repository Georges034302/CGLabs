/* Execute the graphics setup, build, and animate functions
 * - setScene
 * - createCubes
 * - addShapes
 * - animate
 * - animateColor
 * - add window event listener to trigger the resize function
 */

setScene();
createCubes();
addShapes();
animate();
animateColor();
window.addEventListener('Resize',resizeScene);