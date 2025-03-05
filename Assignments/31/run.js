console.log("run.js loaded");
/* Execute the graphics setup, build, and animate functions
 * - setScene
 * - addShapes
 * - animate_earth
 * - animate_moon
 * - add window event listener to trigger the resize function
 */
setScene();
addShapes();
animate_earth();
animate_moon();
window.addEventListener('resize',resizeScene);