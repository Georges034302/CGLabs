/* global THREE */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(2, 3, 5);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create the ground
var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 10, 5, 10),
    new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true }));
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

//create the ball
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true }));
scene.add(ball);

//use THREE current clock
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

render();

function render() {
    requestAnimationFrame(render); //repaint the window after every iteration --> call-in render method(recuresively)
    delta = clock.getDelta(); // update the THREE clock 
    time += delta; // update the function internal timer
    ball.rotation.x = time * 4; //rotate relatively to the function timer
    ball.position.y = 0.5 + Math.abs(Math.sin(time * 3)) * 2; // change the ball y-pos relatively with the time
    ball.position.z = Math.cos(time) * 4; // change the ball z-pos relatively with the time
    renderer.render(scene, camera);