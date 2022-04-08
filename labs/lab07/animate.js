/* global subd, THREE, size, scene, material_tissue, dat */
var interval = 0.02;
var velocity = 0.1;
var clock = new THREE.Clock();
var time = 0;
var delta = 0;


function animate() {
    interval += velocity;
    for (let i = 0; i < tissue.geometry.vertices.length; i++) {
        var pos = tissue.geometry.vertices[i];
        pos.z = 0;
        var len = 20 * pos.length() / size;
        pos.z = velocity * size * Math.cos(len + interval);
        tissue.geometry.vertices[i] = pos;
    }
    tissue.geometry.verticesNeedUpdate = true;
    tissue.geometry.computeVertexNormals();
}

var gui;

function buildGui() {
    gui = new dat.GUI();
    var params = {
        color: material_tissue.color.getHex(),
        velocity_tissue: velocity
    }
    gui.addColor(params, 'color').onChange(function(val) {
        material_tissue.color.setHex(val);
    });
    gui.add(params, 'velocity_tissue', 0, 0.5).onChange(function(val) {
        velocity = val;
    });
    gui.open();
}

function bounce(object) {
    delta = clock.getDelta();
    time += delta;
    object.position.z = 1.5 + Math.abs(Math.sin(time * 3)) * 2;
}

//final update loop
var updateLoop = function() {
    bounce(sphere);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(updateLoop);
    animate();
};