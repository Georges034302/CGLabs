/* global subd, THREE, size, scene, material_tissue, dat */
var ambientlight;
var cameralight;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath("models/");
mtlLoader.setPath("models/");

//Load a texture object and traverse the texture geometry then apply the combined matrices to the mesh
function loadObject(loader, object) {
    
}

//Create texture object from file
function createObjfromMTL(objmtl) {
    
}

function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    cameralight.castShadow = true;
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
    camera.add(cameralight);
}

//Add all shapes to the scene
function addShapes() {
    createObjfromMTL(/* insert MTL texture file-name here */);
    addLight();
    scene.add(camera);
    scene.add(ambientlight);
}
