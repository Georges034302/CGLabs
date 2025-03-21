/* global THREE, scene, renderer, camera */
var earth;

/* Define the create sphere function
 * - create a material object (type MeshPhongMaterial)
 * - set the color for the material object (HEX)
 * - set the wireframe for the material object to true
 * - create the sphere geometry object (radius, hlines, vlines)
 * - enable the sphere to cast shadow
 * - enable the sphere to receive shadow
 * - create a sphere object from the geometry and material
 * - the function returns a sphere object
 */
function createSphere(radius, hlines, vlines,hex) {
    // code goes here
}

/* Define a function to create a SpotLight
 * - create a spotlight object with (color-hex,intensity)
 * - set the spotlight y position to 18
 * - set the spotlight angle to Math.PI/12
 * - enable the cash shadow
 * - return the spotlight object
 */
function createSpotlight() {
    // code goes here
}

/* Define a function to create a light helper
 * - create a SpotLightHelper object with (spotlight as argument)
 * - return the helper object
 */
function createLightHelper() {
    // code goes here
}

/* Define a function to create a floor mesh
 * - create a floor material from MeshLamberMaterial
 * - set the material to double-sided
 * - define the floor geometry as PlaneGeometry
 * - create the floor mesh
 * - set the floor y position to -8
 * - set the floor rotation to Math.PI/2
 * - disable the floor cast shadow
 * - enable the floor receive shadow
 * - return the floor object
 */
function createFloor() {
   // code goes here
}

/* update the addShapes as follows:
 * - create earth sphere (4, 32, 32, "#71706e");
 * - create a floor
 * - create a spotlight
 * - create spotlight helper
 * - add the spotlight, helper, earth, floor, camera and ambient-light to the scene
 */
function addShapes() {
    // code goes here
}