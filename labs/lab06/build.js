/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var ambientlight;
var cameralight;
var mesh = null;

//Define a function to load a PLYmesh model
function loadModel(model) {
    // Determine the model geometry, material, shape size and color of the PLY (from model code)
    // Apply Scaling and Translation to the model
    // Add the model to the scene
}

//Add Light
function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    camera.add(cameralight);
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
}

//Create floor
function floor() {
    var floorMaterial = new THREE.MeshLambertMaterial();
    floorMaterial.color = new THREE.Color(0.7, 0.7, 0.7);
    floorMaterial.side = THREE.DoubleSide;
    var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    return new THREE.Mesh(floorGeometry, floorMaterial);
}

//Add all shapes to the scene
function addShapes() {
    addLight();
    scene.add(floor());
    scene.add(camera);
    scene.add(ambientlight);
}