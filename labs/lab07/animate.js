/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.05;
var velocity = 0.1;
var heightWave = 0.05;
var period = 20;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;


function animateWave() {
    //Animate wave periodically
    interval += velocity;
    let pos = tissue.geometry.getAttribute('position');
    for(let i=0; i < pos.count;i++){
        let currentPos = new THREE.Vector3();
        currentPos.x = pos.getX(i);
        currentPos.y = pos.getY(i);
        currentPos.z = pos.getZ(i);
        let len = period * currentPos.length()/size;
        currentPos.z = heightWave*size*Math.cos(len+interval);
        pos.setZ(i,currentPos.z);
    }
    pos.needsUpdate = true;
    tissue.geometry.computeVertexNormals();
}

var gui;

function buildGui() {
    gui = new dat.GUI();
    var params = {
        color: material_tissue.color.getHex(),
        velocity_tissue: velocity
    }
    gui.addColor(params,'color').onChange(function(val){
        material_tissue.color.setHex(val);
    });
    gui.add(params,'velocity_tissue',0,0.5).onChange(function(val){
        velocity = val;
    });
    gui.open();
}

function bounce(object) {
    delta = clock.getDelta();
    time += delta;
    object.position.z = 1.5 * Math.abs(Math.sin(time*3))*2;
}

//final update loop
var updateLoop = function() {
    bounce(sphere);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animateWave();
};