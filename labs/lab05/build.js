/* global THREE, scene, renderer, camera */
var earth;


//Create a sphere using variable radius, vertical lines, horizontal lines
function createSphere(radius, hlines, vlines,hex) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(hex);
    material.wireframe = false;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    sphere.castShadow = true;
    return sphere;
}

function createSpotLight(){
    var spotLight = new THREE.SpotLight(new THREE.Color(0xFFFF00),0.5);
    spotLight.position.y = 20;
    spotLight.angle = Math.PI/12;
    spotLight.castShadow = true;
    return spotLight;
}

function createFloor(){
    var material = new THREE.MeshLambertMaterial();
    material.color = new THREE.Color(0.7,0.7,0.7);
    material.side = THREE.DoubleSide;
    var geometry = new THREE.PlaneGeometry(30,30,150,150);
    var floor = new THREE.Mesh(geometry,material);
    floor.position.y = -8;
    floor.rotation.x = Math.PI/2;
    floor.castShadow = false;
    floor.receiveShadow = true;
    return floor;
}

function addShapes() {
    earth = createSphere(4, 32, 32, "#71706e");
    spotLight = createSpotLight();
    var helper = new THREE.SpotLightHelper(spotLight);
    var floor = createFloor();
    scene.add(earth);
    scene.add(spotLight);
    scene.add(helper);
    scene.add(floor);
    scene.add(camera);
    scene.add(ambietLight);
}