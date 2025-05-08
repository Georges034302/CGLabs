
var torusKnot;
var floor;
var controls;

/*
 * generate comments about createFloor function
 * createFloor function creates a floor object using THREE.js. 
 * It uses a BoxGeometry to create a flat surface and applies a MeshLambertMaterial to give it a color and shininess. 
 * The floor is positioned slightly below the origin on the y-axis.
 * The function returns the created floor mesh object.
 * The floor is created with a width and depth of 10 units and a height of 0.2 units. 
 * The color of the floor is set to a light greenish color (0.8, 0.9, 0.3) and the shininess is set to 100.
 * The floor is positioned at y = -3 to place it below the origin, making it appear as a flat surface in the 3D scene.
 * The floor material is set to be double-sided, meaning it will be visible from both sides.
 */
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

/*
 * createKnot function creates a torus knot object using THREE.js.
 * It uses a TorusKnotGeometry to create the shape and applies a MeshPhongMaterial to give it a color.
 * The torus knot is created with default parameters, which can be customized if needed.
 * The function returns the created torus knot mesh object.
 */ 
function createKnot(){
    var geometry_knot = new THREE.TorusKnotGeometry();
	var material_knot = new THREE.MeshPhongMaterial();
	material_knot.color=  new THREE.Color(0.8,1,1);
    var torusKnot = new THREE.Mesh( geometry_knot, material_knot );
	return torusKnot;
}

camera = createCamera();
renderer = createRenderer();
torusKnot = createKnot();
floor = createFloor();

//Add all shapes to the scene
function addShapes() {
    scene.add(camera);
    scene.add(floor);
    scene.add(torusKnot);     
}



