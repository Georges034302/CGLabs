//Define a function to animate the earth object to spin at 0.005 speed


//Define a function to animate the moon object to rotate around the earth
//Rotation positions x and y are determined using the distance from earth multiplied by cos and sin of alpha angle

var speed = 0.01;

function rotate(object) {
    object.rotation.x += speed;
    object.rotation.z += speed;
}

function changeColor(object) {
    var color = new THREE.Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);
    object.material.color = color;
}

function animate() {
    renderer.render(scene, camera);
    cubes.forEach(rotate); //reference call the rotate function for every object in the array
    group.rotation.y += speed;
    requestAnimationFrame(animate);
}

function animateColor() {
    renderer.render(scene, camera);
    cubes.forEach(changeColor);
    setTimeout(function() {
        requestAnimationFrame(animateColor);
    }, 1000 / 10);
}