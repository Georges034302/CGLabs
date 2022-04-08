/* global subd, THREE, size, scene, material_tissue, dat */
var ambientlight;
var cameralight;
var tissue = null;
var material_tissue;
var size = 8;

function AccessGrid(x, y, subd) {
    var index = x * subd + y;
    return index;
}

function translate(object, subd) {
    var step = size / subd;
    for (let i = 0; i < subd; i++)
        for (let j = 0; j < subd; j++) {
            var pos = new THREE.Vector3(i * step, j * step, 0);
            var pos_trans = new THREE.Vector3;
            pos_trans.copy(pos);
            pos_trans.add(new THREE.Vector3(-size / 2, -size / 2, 0));
            object.vertices.push(pos_trans);
        }
}

function push(object, subd) {
    for (let i = 0; i < subd - 1; i++)
        for (let j = 0; j < subd - 1; j++) {
            var Idx0 = AccessGrid(i, j, subd);
            var Idx1 = AccessGrid(i + 1, j, subd);
            var Idx2 = AccessGrid(i + 1, j + 1, subd);
            var Idx3 = AccessGrid(i, j + 1, subd);

            object.faces.push(new THREE.Face3(Idx1, Idx0, Idx2));
            object.faces.push(new THREE.Face3(Idx2, Idx0, Idx3));
        }
}

function buildMesh(object) {
    object.computeVertexNormals();
    material_tissue = new THREE.MeshPhongMaterial();
    material_tissue.color = new THREE.Color(1, 1, 0.4);
    material_tissue.side = THREE.DoubleSide;

    tissue = new THREE.Mesh(object, material_tissue);
    tissue.name = "tissue_mesh";
    tissue.castShadow = false;
    tissue.receiveShadow = true;
}

function createMesh() {

}

//add light
function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    cameralight.castShadow = true;
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
    camera.add(cameralight);
}

//Create floor
function createFloor() {
    var floorMaterial = new THREE.MeshLambertMaterial();
    floorMaterial.color = new THREE.Color(0.7, 0.7, 0.7);
    floorMaterial.side = THREE.DoubleSide;
    var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    return new THREE.Mesh(floorGeometry, floorMaterial);
}

function createSphere(radius, hlines, vlines, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = true;
    material.shininess = 100;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var s = new THREE.Mesh(geometry_sphere, material);
    s.position.z = 2;

    return s;
}
var sphere = createSphere(1.5, 40, 40, 0xFFFFF);
//Add all shapes to the scene
function addShapes() {
    scene.add(createFloor());
    addLight();
    scene.add(camera);
    scene.add(ambientlight);
}