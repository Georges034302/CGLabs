/* global THREE, scene, renderer, camera */

//Load models from local file: .ply
var loader = new THREE.PLYLoader();
var ambientlight;
var cameralight;
var floor = null;
var mesh = null;

//Define a function to load a PLYmesh
function loadModel(model) {
    loader.load(model, function(geometry) {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        var center = geometry.boundingBox.getCenter();
        var size = geometry.boundingBox.getSize();
        var min = geometry.boundingBox.min;

        var sca = new THREE.Matrix4();
        var tra = new THREE.Matrix4();

        var ScaleFact = 5 / size.length();
        sca.makeScale(ScaleFact, ScaleFact, ScaleFact);
        tra.makeTranslation(-center.x, -center.y, -min.z);
        var material = new THREE.MeshPhongMaterial();
        material.color = new THREE.Color(0.6, 0.2, 0.4);
        material.shininess = 100;
        mesh = new THREE.Mesh(geometry, material);
        mesh.applyMatrix(tra);
        mesh.applyMatrix(sca);
        mesh.name = "loaded_mesh";
        scene.add(mesh);
    });
}

//Add Light
function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    camera.add(cameralight);
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
}

//Create floor
function createFloor() {
    var floorMaterial = new THREE.MeshLambertMaterial();
    floorMaterial.color = new THREE.Color(0.7, 0.7, 0.7);
    floorMaterial.side = THREE.DoubleSide;
    var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
}

//Add all shapes to the scene
function addShapes() {
    scene.add(floor);
    scene.add(camera);
    scene.add(ambientlight);
}