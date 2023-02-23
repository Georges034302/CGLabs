function createCube(w,h,d,r,g,b,wf){
    var cube_material = new THREE.MeshBasicMaterial();
    cube_material.color = new THREE.Color(r,g,b);
    cube_material.wireframe = wf;
    var cube_geo = new THREE.BoxGeometry(w,h,d);
    var cube = new THREE.Mesh(cube_geo,cube_material);
    return cube;
}

var cube1 = createCube(3,3,3,1,1,0,true);

function addShapes(){
    scene.add(cube1);
    renderer.render(scene,camera);
}