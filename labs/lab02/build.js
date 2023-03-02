//sphere properties: radius, vlines, hlines and color(r,g,b)
//The function should return a sphere using the parametrized properties
//Initialize 2 sphere objects (earth and moon)
//Define a function to add shapes to scene
function createSphere(radius,hlines,vlines,r,g,b,wf){
    var sphere_material = new THREE.MeshBasicMaterial();
    sphere_material.color = new THREE.Color(r,g,b);
    sphere_material.wireframe = wf;
    var sphere_geo = new THREE.SphereGeometry(radius,hlines,vlines);
    var sphere = new THREE.Mesh(sphere_geo,sphere_material);
    return sphere;
}

var earth = createSphere(2,44,44,0,1,0,true);
var moon = createSphere(1,32,32,1,1,1,true);

function addShapes(){
    scene.add(earth);
    scene.add(moon);
    renderer.render(scene,camera);
}