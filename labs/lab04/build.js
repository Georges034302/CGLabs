
function createcube(w,h,d,color,wf){
    var cube_material = new THREE.MeshBasicMaterial();
    cube_material.color = new THREE.Color(color);
    cube_material.wireframe = wf;
    var cube_geo = new THREE.BoxGeometry(w,h,d);
    var cube = new THREE.Mesh(cube_geo,cube_material);
    return cube;
}

var n = 36; //how many objects to create and store into the array
var cubes = []; //empty array
const group = new THREE.Group(); //the group helps adding many objects to the scene

function createcubes(){
    for(let i=0; i<n;i++){
        var rot2 = new THREE.Matrix4();
        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();

        sca.makeScale(0.5,3,1.5);
        rot2.makeRotationZ(i*(Math.PI/n))
        tra.makeTranslation(10,5,0);
        rot.makeRotationY(i*(2*Math.PI/n));

        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(rot2);
        combined.multiply(sca);

        var color = new THREE.Color(0xffffff);
        color.setHex(Math.random()*0xffffff);
        cubes[i] = createcube(1,1,1,color,true);
        cubes[i].applyMatrix(combined);
        group.add(cubes[i]);
    }
}

function addShapes(){
    scene.add(group);
    renderer.render(scene,camera);
}