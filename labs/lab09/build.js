
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

//Step 2: generate a TorusKnot object
function createKnot(){
    var geo_knot = new THREE.TorusKnotGeometry();
    var material_knot = new THREE.MeshPhongMaterial();
    material_knot.color = new THREE.Color(0.8,1,1);
    var torus_knot = new THREE.Mesh(geo_knot,material_knot);
    return torus_knot;
}

camera = createCamera();
renderer = createRenderer();
floor = createFloor();
torusKnot = createKnot();

//Add all shapes to the scene
function addShapes() {
    scene.add(camera);
    scene.add(floor);   
    scene.add(torusKnot);
}



