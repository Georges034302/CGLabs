/* global THREE, cube, scene, camera, renderer */

/* 
 * Primary animation function
 * - update the controls
 * - recall the renderer
 * - request animation frame for infinite recursion
 */ 
function animate() {
    // code goes here
}

/* Define a function to select and move the PLY
 * - create a mouse 2-D vector
 * - get mouse (x,y) using current mouse point event
 * - associate RayCaster with mouse and camera
 * - get the intersection points from the RayCaster with the scene children (like a PLY Mesh)
 * - check if:
 * -- size of the intersections array length > 0 ---> the mouse has selected the PLY
 * ---> check if the name is loaded_mesh 
 * -------> change the Mesh color
 * -------> set selected object to true
 * ---> check if object name is not loaded_mesh 
 * -------> change the Mesh color
 * -------> get the intersection point from current mouse point
 * -------> set the mesh (x,y) to the current mouse (x,y)
 * -------> set the selected object to false
 */
var rayCaster = new THREE.Raycaster();
var selectedObj = false;

function onDocumentMouseDown(event) {
   // code goes here
}