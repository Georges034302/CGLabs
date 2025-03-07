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
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = true;
    var geometry = new THREE.BoxGeometry(w,h,d);
    var cube = new THREE.Mesh(geometry, material);
    return cube;
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
   for(let i=0; i< n; i++){
        var rot2 = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();

        var combined = new THREE.Matrix4();

        sca.makeScale(0.5, 3, 1.5);
        rot2.makeRotationZ(i * (Math.PI / n));
        tra.makeTranslation(10, 5, 0);
        rot.makeRotationY(i * (2 * Math.PI / n));

        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);

        var color = new THREE.Color(0xffffff);
        color.setHex(Math.random() * 0xffffff);

        cubes[i] = createCube(1,1,1,color);
        cubes[i].applyMatrix(combined);
        group.add(cubes[i]);
   }
}


function addShapes() {
    //add the group of cubes to the scene
    scene.add(group);
}