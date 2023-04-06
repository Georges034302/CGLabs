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

function buildVertices(subd) {
    var step = size / subd;
    const vertices = [];
    for (let i = 0; i < subd; i++)
        for (let j = 0; j < subd; j++) {
            var pos = new THREE.Vector3(i * step, j * step, 0);
            var pos_trans = new THREE.Vector3;
            pos_trans.copy(pos);
            pos_trans.add(new THREE.Vector3(-size / 2, -size / 2, 0));
            var len = 20 * pos_trans.length() / size;
            pos_trans.z = 0.1 * size * Math.cos(len);
            vertices.push(pos_trans.x, pos_trans.y, pos_trans.z);
        }
    return vertices;
}

function builIndexes(subd) {
    const indices = [];
    for (let i = 0; i < subd - 1; i++)
        for (let j = 0; j < subd - 1; j++) {
            var Idx0 = AccessGrid(i, j, subd);
            var Idx1 = AccessGrid(i + 1, j, subd);
            var Idx2 = AccessGrid(i + 1, j + 1, subd);
            var Idx3 = AccessGrid(i, j + 1, subd);

            indices.push(Idx1, Idx0, Idx2);
            indices.push(Idx2, Idx0, Idx3);
        }
    return indices;
}

function buildMesh(object, indices, vertices) {
    object.setIndex(indices);
    object.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    object.computeVertexNormals();
    material_tissue = new THREE.MeshPhongMaterial();
    material_tissue.color = new THREE.Color(1, 1, 0.4);
    material_tissue.side = THREE.DoubleSide;
    let mesh = new THREE.Mesh(object, material_tissue);
    mesh.name = "tissue_mesh";
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.geometry.computeVertexNormals();
    return mesh;
}

function createMesh() {
    let subd = 100;
    let geom = new THREE.BufferGeometry();
    let vertices = buildVertices(subd);
    let indices = builIndexes(subd);
    tissue = buildMesh(geom, indices, vertices);
    return tissue;
}

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

//create a sphere
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

//create sphere object
var sphere = createSphere(1.5,25,25,0xff00ff);

function addShapes() {
    //add mesh
    scene.add(createMesh());
    //add floor
    scene.add(createFloor());
    //add sphere
    scene.add(sphere);
    addLight();
    scene.add(camera);
    scene.add(ambientlight);
}