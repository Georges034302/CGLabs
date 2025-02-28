/* Define the create sphere function
 * - create a material object (type MeshBasicMaterial)
 * - set the color for the material object (HEX)
 * - set the wireframe for the material object to true
 * - create the sphere geometry object (radius, hlines, vlines)
 * - create a sphere object from the geometry and material
 * - the function returns a sphere object
 */
function createSphere(radius, hlines, vlines, color) {
   // code goes here
   var material = new THREE.MeshBasicMaterial();
   material.color = new THREE.Color(color);
   material.wireframe = true;
   var geometry = new THREE.SphereGeometry(radius,hlines,vlines);
   var sphere = new THREE.Mesh(geometry,material);
   return sphere;
}

/*
 * Create earth sphere (radius=2,hlines=44,vlines=44,color=green)
 * Create moon sphere (radius=1,hlines=32,vlines=32,color=white)
 */
var earth = createSphere(4,44,44,"#00FF00");
var moon = createSphere(2,32,32,"C0C0C0");

/* Define the add shapes function
 * - add the earth to the scene
 * - add the moon to the scene
 */
function addShapes() {
    // code goes here
    scene.add(earth);
    scene.add(moon);
}