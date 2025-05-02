const r = 100;
var alpha = 0;
var dalpha = 2 * Math.PI / 200;

//final loop
function animate() {
    spin();
    requestAnimationFrame(animate);
}
animate();

/**
 * Updates the alpha values of the cloud's geometry attributes to create a fading effect,
 * and animates the cloud's position in a circular motion around the origin.
 * 
 * The function performs the following:
 * - Increments the `alpha` value to determine the current angle of rotation.
 * - Iterates through the `alpha` attribute of the cloud's geometry to gradually reduce
 *   its values, resetting them to 1.0 if they fall below 0.01.
 * - Updates the `needsUpdate` flag to ensure the changes to the geometry are applied.
 * - Calculates the new position of the cloud based on the updated `alpha` value,
 *   moving it in a circular path with radius `r`.
 * - Renders the scene using the provided `renderer`, `scene`, and `camera`.
 */
function spin() {
    // code goes here
    alpha += dalpha;
    var alphas = cloud.geometry.attributes.alpha.array;
    var count = alphas.length;
    for (var i = 0; i < count; i++) {
        alphas[i] *= 0.95;
        if (alphas[i] < 0.01) {
            alphas[i] = 1.0;
        }
    }
    alphas.needsUpdate = true;
    cloud.position.x = -r * Math.cos(alpha);
    cloud.position.z = r * Math.sin(alpha);
    renderer.render(scene, camera);
}