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
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(1,1,1);
    material.color.set(hex)
    material.wireframe = false;
    var geometry = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = false;
    return sphere;
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
    var spotlight = new THREE.SpotLight(new THREE.Color(0xffff00), 0.5);
    spotlight.position.y = 18;
    spotlight.angle = Math.PI/12;
    spotlight.castShadow = true;
    return spotlight;   

}

/* Define a function to create a light helper
 * - create a SpotLightHelper object with (spotlight as argument)
 * - return the helper object
 */
function createLightHelper() {
    // code goes here
    var helper = new THREE.SpotLightHelper(spotlight);
    return helper;

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
    var material = new THREE.MeshLambertMaterial();
    material.side = THREE.DoubleSide;
    material.color = new THREE.Color(0x71706e);
    var geometry = new THREE.PlaneGeometry(30,30,200,200);
    var floor = new THREE.Mesh(geometry, material);
    floor.position.y = -8;
    floor.rotation.x = Math.PI/2;
    floor.castShadow = false;
    floor.receiveShadow = true;
    return floor;

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
    earth = createSphere(4, 32, 32, "#71706e");
    var floor = createFloor();
    spotlight = createSpotlight();
    var helper = createLightHelper();
    scene.add(spotlight);
    scene.add(helper);
    scene.add(earth);
    scene.add(floor);
    scene.add(camera);
    scene.add(ambientLight);
}