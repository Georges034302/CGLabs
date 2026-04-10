/* Execute the graphics setup, build, and animate functions
 * - setScene
 * - addShapes
 * - animateScene
 * - add window event listener to trigger the resize function
 */
setScene();
addShapes();
animateScene();
window.addEventListener('resize', resizeScene);
