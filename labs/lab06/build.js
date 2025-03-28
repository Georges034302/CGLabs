/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var ambientlight;
var cameralight;
var mesh = null;

//Define a function to load a PLYmesh from file
/*
 * Use the PLYLoader function load to define anonymous function as follows:
 * - compute the geometry vertex normal
 * - compute the geometry bounding box
 * - get the center, size, min values from the bounding box
 * - create a scaling and translation Matrix4 objects
 * - set the scale factor to 5 / size.length();
 * - set the scaling factor to x, y, z
 * - set the translation -center.x, -center.y, -min.z to x, y, z
 * - crate MeshPhongMaterial
 * - set tje color and shininess 
 * - create a mesh from geometry and material
 * - apply the translation and scaling to the mesh
 * - set the mesh name to loaded_mesh
 * - add the mesh to the scene
 */
function loadModel(model) {
   // code goes here
}

/* Define the set light function
 * - create a PointLight with 1 intensity
 * - add the point  light to the camera as camera light
 * - create AmbientLight with 0.2 intensity
 */
function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    camera.add(cameralight);
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
}

/* Define a function to create a floor mesh
 * - create a floor material from MeshLamberMaterial
 * - set the material to double-sided
 * - define the floor geometry as PlaneGeometry
 * - create the floor mesh
 * - return the floor object
 */
function floor() {
    var floorMaterial = new THREE.MeshLambertMaterial();
    floorMaterial.color = new THREE.Color(0.7, 0.7, 0.7);
    floorMaterial.side = THREE.DoubleSide;
    var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    return new THREE.Mesh(floorGeometry, floorMaterial);
}

/* update the addShapes as follows:
 * - add a floor
 * - add a spotlight
 * - add a camera
 * - add the ambient light
 */
function addShapes() {
    addLight();
    scene.add(floor());
    scene.add(camera);
    scene.add(ambientlight);
}