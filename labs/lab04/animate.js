const speed = 0.003;

//Animate a sphere to rotate around x axis and transform along y, z axis
function animate_earth() {
    requestAnimationFrame(animate_earth);
    earth.rotation.y += speed;
    renderer.render(scene, camera);
}

function animate_moons(){
    requestAnimationFrame(animate_moons);
    group.rotation.y += speed;
    renderer.render(scene, camera);
}

function change_color(object){
    var color = new THREE.Color(0xffffff);
    color.setHex(Math.random()*0xffffff);
    object.material.color = color;
}

function animate_color(){
    renderer.render(scene, camera);
    moons.forEach(change_color);
}
