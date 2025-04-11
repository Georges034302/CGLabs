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
var loader = new THREE.MTLLoader();
loader.setPath("models/");
loader.setTexturePath("models/");    

/*
    STEP 2: Load a texture object and determine its attributes
    a - determine object color, center and size
    b - apply scaling and translation to the object
*/
/*
    generate line-by-line comments for the code below:
    - The function loadTexture takes a loader and an object as parameters.
    - It uses the loader to load the specified object.
    - When the object is loaded, it traverses through its children to find meshes.
    - For each mesh, it creates a new geometry from the buffer geometry and computes its bounding box.
    - The color of the mesh material is set to white.
    - The center and size of the bounding box are determined.
    - The mesh is added to the scene.
    - A scaling matrix is created to scale the mesh to a size of 10 units.
    - A translation matrix is created to center the mesh at the origin.
    - The combined matrix is created by multiplying the scaling and translation matrices.
    - The combined matrix is applied to the mesh to transform it.
    - The function is called to load the object and apply the transformations.
    - The function is used to load a texture object and determine its attributes.
 */
function loadTexture(loader, object) {
    /// Code Step 2 here ///
    loader.load(object, function(mesh){
        var size;
        var center;
        mesh.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                var geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                geometry.computeBoundingBox();
                child.material.color.setHex(0xffffff);
                center = geometry.boundingBox.getCenter();
                size = geometry.boundingBox.getSize();
            }
        });
        scene.add(mesh);
        var sca = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();
        sca.makeScale(10/size.length(), 10/size.length(), 10/size.length());
        tra.makeTranslation(-center.x, -center.y, -center.z);
        combined.multiply(sca);
        combined.multiply(tra);
        mesh.applyMatrix(combined);
        mesh.updateMatrix();
    });
}

/*
    Step 3: Create object from MTL model stored in file
    generate line-by-line comments for the code below:
    - The function createObj is defined to load an object using MTLLoader.
    - It creates a new MTLLoader object.
    - The path for the loader is set to "models/"
    - The loader is used to load the MTL file "Librarian.obj.mtl".
*/
function createObj() {
   /// Code Step 3 here ///
    loader.load("Librarian.obj.mtl", function(materials) {
        materials.preload();
        var objloader = new THREE.OBJLoader();
        objloader.setMaterials(materials);
        objloader.setPath("models/");
        loadTexture(objloader, "Librarian.obj");
    });
}

// The addLight function creates a point light and an ambient light in the scene.
// The point light is positioned at the camera's location and casts shadows, while the ambient light provides a soft illumination to the scene.
// The camera is then added to the scene along with the ambient light.
// The function is called to ensure that the lights are set up correctly for the scene's rendering.
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