/* global THREE, scene, renderer, camera */

/* Define the create cube function
 * - create a material object (type MeshBasicMaterial)
 * - set the color for the material object (HEX)
 * - set the wireframe for the material object
 * - create the cube geometry box object (w, h, d)
 * - create a cube object from the geometry and material
 * - the function returns a cube object
 */
function createCube(w, h, d, color) {
    // code goes here
}


var n = 36;
var cubes = [];
const group = new THREE.Group();
/* Define a function to create n-cubes and add the cubes to the group
* Create group of cubes [36]
* Create 4 types of cube transformations (2 rotations, scaling, and translation)
* Create one combined the transformation Matrix
* Configure the following transformations:
```
    sca.makeScale(0.5, 3, 1.5)
    rot2.makeRotationZ(i * (Math.PI / n))
    tra.makeTranslation(10, 5, 0)
    rot.makeRotationY(i * (2 * Math.PI / n))
```
* Combine the transformations into the combined Matrix
* Set a random color for each cube
* Apply the combined Matrix to each cube in the collection
* Add the cubes to the group
**/
function createCubes() {
   // code goes here
}


function addShapes() {
    //add the group of cubes to the scene
    
}