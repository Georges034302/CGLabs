//Define a function to animate the earth object to spin at 0.005 speed


//Define a function to animate the moon object to rotate around the earth
//Rotation positions x and y are determined using the distance from earth multiplied by cos and sin of alpha angle

var speed = 0.01;

function rotate(object) {
    object.rotation.x += speed;
    object.rotation.z += speed;
}

function animate() {
    renderer.render(scene, camera);
    cubes.forEach(rotate); //reference call the rotate function for every object in the array
    group.rotation.y += speed;

    requestAnimationFrame(animate);
}
