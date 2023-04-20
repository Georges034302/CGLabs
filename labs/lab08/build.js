/* global subd, THREE, size, scene, material_tissue, dat */
var ambientlight;
var cameralight;

//STEP 1: load models folder from path using MTLLoader
var mtlloader = new THREE.MTLLoader();
mtlloader.setTexturePath("models/");
mtlloader.setPath("models/");


//Step 2: Load a texture object and traverse the texture geometry 
//then apply the combined matrices to the mesh
function loadTexture(loader, object) {
    loader.load(object,function(mesh){
        var center;
        var size;
        mesh.traverse(function(child){
            if(child instanceof THREE.Mesh){
                var geo = new THREE.Geometry().fromBufferGeometry(child.geometry);
                child.material.color = new THREE.Color(1,1,1);
                center = geo.boundingBox.getCenter();
                size = geo.boundingBox.getSize();
            }
        });
        scene.add(mesh);
        var sca = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();
        sca.makeScale(10/size.length(),10/size.length(),10/size.length());
        tra.makeTranslation(-center.x,-center.y,-center.z);
        combined.multiply(sca);
        combined.multiply(tra);
        mesh.applyMatrix(combined);
    });
}


//Step 3: Create object from MTL model stored in file
function createObj() {
    mtlloader.load('Librarian.obj.mtl',function(materials){
        materials.preload();
        var objloader = new THREE.OBJLoader();
        objloader.setPath("models/");
        objloader.setMaterials(materials);
        loadTexture(objloader,'Librarian.obj');
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