/* global THREE, scene, renderer, camera */
var earth;
var moons = [];
const group = new THREE.Group();

//Create a sphere using variable radius, vertical lines, horizontal lines
function createSphere(radius, hlines, vlines,hex) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(hex);
    material.wireframe = false;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

/*
 * Updated function from Lab 3 to create n spheres
 */
function createMoons(n){
    for(let i=0;i<n;i++){
        var rot2 = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();
        sca.makeScale(1, 1, 1);
        rot2.makeRotationZ(i * (Math.PI / n));
        tra.makeTranslation(10, 1,10);
        rot.makeRotationY(i * (2 * Math.PI / n));
        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);
        moons[i] = createSphere(1,n,n,0xffffff);
        moons[i].applyMatrix(combined);
        group.add(moons[i]);
    }
}

/*
 * create earth  (4, 32, 32, "#71706e");
 * add earth to scene
 * create 20 moons
 * add the group to the scene
 * add camera
 * add ambient light
 */
function addShapes() {
    //code goes here
    earth = createSphere (4, 32, 32, "#71706e");
    scene.add(earth);
    createMoons(20);
    scene.add(group);
    scene.add(camera);
    scene.add(ambientLight);
}