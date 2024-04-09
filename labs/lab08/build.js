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
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath("models/");
mtlLoader.setPath("models/");

/*
    Step 2: Load a texture object and determine its attributes
    a - determine object color, center and size
    b - apply scaling and translation to the object
*/
function loadTexture(loader, object) {
    /// Code Step 2 here ///
    loader.load(object,function(mesh){
        var size;
        var center;
        mesh.traverse(function(child){
            if(child instanceof THREE.Mesh){
                var geom = new THREE.Geometry().fromBufferGeometry(child.geometry);
                geom.computeBoundingBox();
                child.material.color = new THREE.Color(1,1,1);
                center = geom.boundingBox.getCenter();
                size = geom.boundingBox.getSize();
            }
        });
        scene.add(mesh);
        var sca = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();
        sca.makeScale(10/size.length(),10/size.length(),10/size.length());
        tra.makeTranslation(-center.x,-center.y, -center.z);
        combined.multiply(sca);
        combined.multiply(tra);
        mesh.applyMatrix(combined);
    });
}

/*
    Step 3: Create object from MTL model stored in file
*/
function createObj() {
   /// Code Step 2 here ///
   mtlLoader.load("Librarian.obj.mtl",function(materials){
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setPath("models/");
    objLoader.setMaterials(materials);
    loadTexture(objLoader,"Librarian.obj")
   });
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