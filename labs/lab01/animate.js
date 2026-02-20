/* Define the animate cube function
 * - update the cube x-rotation with 0.04 ratio
 * - update the cube y-rotation with 0.04 ratio
 * - set the cube z-position to 3
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function animate_cube() {
   // code goes here
   cube.rotation.x += 0.04;
   cube.rotation.y += 0.04;
   cube.position.z = 3;
   renderer.render(scene, camera);
   requestAnimationFrame(animate_cube);

 }

/* Define the animate sphere function
 * - update the sphere x-rotation with 0.004 ratio
 * - update the sphere y-rotation with 0.008 ratio
 * - set the sphere z-position to 3
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
function animate_sphere() {
    // code goes here
   sphere.rotation.x += 0.04;
   sphere.rotation.y += 0.088;
   sphere.position.z = 3;
   renderer.render(scene, camera);
   requestAnimationFrame(animate_sphere);
}