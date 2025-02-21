/* Define the animate cube function
 * - update the cube x-rotation with 0.04 ratio
 * - update the cube y-rotation with 0.04 ratio
 * - set the cube z-position to 3
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function animate_cube() {
    requestAnimationFrame(animate_cube);
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    cube.position.z = 3;
    renderer.render(scene, camera);
}

/* Define the animate sphere function
 * - update the sphere x-rotation with 0.004 ratio
 * - update the sphere y-rotation with 0.008 ratio
 * - set the sphere z-position to 3
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function animate_sphere() {
    requestAnimationFrame(animate_sphere);
    sphere.rotation.x += 0.004;
    sphere.rotation.y += 0.008;
    sphere.position.z = 3;

    renderer.render(scene, camera);
}