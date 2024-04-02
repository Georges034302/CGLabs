/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.05;
var velocity = 0.1;
var heightWave = 0.09;
var period = 20;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

//Define a function to animate the tissue
// 1- animation should be a ripple-pattern
// 2- The length of ripple: period * currP.length() / size;
// 3- calculate z position: heightWave * size * Math.cos(len + interval);
// 4- set z position for every vector point i
function animate() {
   interval += velocity;
   let pos = tissue.geometry.getAttribute('position');
   for(let i=0;i< pos.count; i++){
        let current_p = new THREE.Vector3();
        current_p.x = pos.getX(i);
        current_p.y = pos.getY(i);
        current_p.z = pos.getZ(i);
        let len = period * current_p.length() / size;
        current_p.z = heightWave * size * Math.cos(len + interval);
        pos.setZ(i,current_p.z);
   }
   pos.needsUpdate = true;
   tissue.geometry.computeVertexNormals();
}

//Create a GUI menu to control:
// 1- color of the tissue
// 2- animation velocity of the tissue
var gui;
function buildGui() {
    gui = new dat.GUI();
    var params = {
        color: material_tissue.color.getHex(),
        velocity:velocity
    }
    gui.addColor(params,'color').onChange(function(val){
        material_tissue.color.setHex(val);
    });
    gui.add(params,'velocity',0,0.5).onChange(function(val){
        velocity = val;
    });
    gui.open();
}

//Define a function to animate a sphere
//Ensure that the sphere bounces in the center of the tissue-mesh
function bounce(object) {
    delta = clock.getDelta();
    time += delta;
    object.position.z = 2+Math.abs(Math.sin(time*3))*2;
}

//final update loop --> animate the GUI
//Ensure orbit-controls are available for this GUI
var updateLoop = function () {
    bounce(sphere);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animate();
};