/* global THREE, cube, scene, camera, renderer */

/* 
 * Primary animation function
 * - update the controls
 * - recall the renderer
 * - request animation frame for infinite recursion
 */ 
function animate() {
    // code goes here
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
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
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    rayCaster.setFromCamera(mouse, camera);
    var intersects = rayCaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (intersects[0].object.name === "loaded_mesh" && !selectedObj) {
            intersects[0].object.material.color.setHex(0xff0000);
            selectedObj = true;
        } else {
            intersects[0].object.material.color.setHex(0x00ff00);
            var point = intersects[0].point;
            mesh.position.x = point.x;
            mesh.position.y = point.y;
            selectedObj = false;
        }
    }
    //console.log(intersects[0].point);
}