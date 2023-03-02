var scene;
var camera;
var renderer;

function setScene(){
    scene = new THREE.Scene();
    var ratio = window.innerWidth/window.innerHeight;

    camera = new THREE.PerspectiveCamera(45,ratio,0.1,1000);
    camera.position.set(0,5,15);
    camera.lookAt(0,0,5);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

var resizeScene = function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.render(scene,camera);
}