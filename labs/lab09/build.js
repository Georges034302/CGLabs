
var torusKnot;
var floor;
var controls;

//Create floor
function createFloor() {
    var floorMaterial = new THREE.MeshLambertMaterial();
    floorMaterial.shininess=100;
    floorMaterial.color = new THREE.Color(0.8,0.9,0.3);
    floorMaterial.side = THREE.DoubleSide;
    var floorGeometry = new THREE.BoxGeometry(10,0.2,10);
    var floorMesh= new THREE.Mesh( floorGeometry, floorMaterial);
    floorMesh.position.y-=3;
    return floorMesh;
}

//Step 2: create a knot
function createKnot(){

}

camera = createCamera();
renderer = createRenderer();
floor = createFloor();

//Add all shapes to the scene
function addShapes() {
    scene.add(camera);
    scene.add(floor);   
}



