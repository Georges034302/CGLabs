/* global subd, THREE, size, scene, material_tissue, dat */
var ambientlight;
var cameralight;

//STEP 1: load models folder from path using MTLLoader



//Step 2: Load a texture object and traverse the texture geometry 
//then apply the combined matrices to the mesh
function loadTexture(loader, object) {

}


//Step 3: Create object from MTL model stored in file
function createObj() {


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