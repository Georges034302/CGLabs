/* global subd, THREE, size, scene, material_tissue, dat */
var ambientlight;
var cameralight;

/*
    STEP 1: load models folder from path using MTLLoader
    a - create MTLLoader object
    b - set the loader file path
    b - set the loader models path
*/
/// Code Step 1 here ///


/*
    Step 2: Load a texture object and determine its attributes
    a - determine object color, center and size
    b - apply scaling and translation to the object
*/
function loadTexture(loader, object) {
    /// Code Step 2 here ///
}

/*
    Step 3: Create object from MTL model stored in file
*/
function createObj() {
   /// Code Step 2 here ///
}

function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    cameralight.castShadow = true;
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
    camera.add(cameralight);
}


//Add all shapes to the scene
function addShapes() {
    createObj();
    addLight();
    scene.add(camera);
    scene.add(ambientlight);
}