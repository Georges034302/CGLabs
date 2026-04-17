// Define rotation speed constant = 0.005
/* Define the animation function
 * - update the earth y-rotation with the rotation speed constant
 * - update the earth orbit around the sun using cos/sin
 * - update the moon orbit around the earth (clockwise) using cos/sin
 * - make the moon tidally-locked to the earth (always faces earth)
 * - update the controls (required for damping)
 * - render the view (scene, camera)
 * - request animation frame calling the function into infinite loop
 */
const speed = 0.015; // Earth self-rotation speed (spin)
var theta = 0; // Earth orbit angle around Sun (starts at 0)
var dtheta = 2 * Math.PI / 2000; // Earth orbit angle step per frame (orbit speed)
var alpha = 0; // Moon orbit angle around Earth (starts at 0)
var dalpha = 4 * Math.PI / 1000; // Moon orbit angle step per frame (moon orbit speed)

/* Define the system animation function (Lab 2)
 * - update earth spin + orbit
 * - update moon orbit + tidal lock
 */
function animateSystem() {
   earth.rotation.y += speed; // rotate Earth on its own axis (spin)
   theta += dtheta; // update Earth orbit angle
   earth.position.x = earthOrbit * Math.cos(theta); // update Earth x position (orbit)
   earth.position.z = earthOrbit * Math.sin(theta); // update Earth z position (orbit)
   alpha -= dalpha; // update Moon orbit angle
   moon.position.x = earth.position.x + moonOrbit * Math.cos(alpha); // update Moon x position (orbit around Earth)
   moon.position.z = earth.position.z + moonOrbit * Math.sin(alpha); // update Moon z position (orbit around Earth)
   moon.position.y = earth.position.y; // keep Moon in the same plane
   moon.lookAt(earth.position); // make Moon always face Earth (tidal locking)
}

/* Define the Dyson halo animation function (Lab 3)
 * - rotate two halo groups around the fixed Sun
 */
function animateDyson() {
   if (typeof haloA !== "undefined" && haloA) haloA.rotation.y += 0.01;
   if (typeof haloB !== "undefined" && haloB) haloB.rotation.y += 0.01;
}

/* -----------------------------------------------------
   LAB 7: Animate asteroid belt
   - rotate the asteroid belt slowly around the Sun
   ----------------------------------------------------- */
function animateAsteroidBelt() {
   if (typeof asteroidBelt !== "undefined" && asteroidBelt) {
      asteroidBelt.rotation.y += rotationSpeed;
   }
}

/* -----------------------------------------------------
   LAB 8: Galactus consumes nearby asteroids
   - check distance from each asteroid to Galactus
   - remove asteroids that are close enough
   ----------------------------------------------------- */
function animateGalactus() {
      // add code here to check distance from each asteroid to Galactus and remove asteroids that are close enough
      if (typeof asteroidBelt === "undefined" || !asteroidBelt) {
         return;
      }
      if (typeof galactus === "undefined" || !galactus) {
         return;
      }

      scene.updateMatrixWorld(); // Ensure world matrices are up to date

      var galactusPosition = new THREE.Vector3();
      galactus.getWorldPosition(galactusPosition); // Get Galactus's world position 

      for (let i = asteroidBelt.children.length - 1; i >= 0; i--) {
         var asteroid = asteroidBelt.children[i];
         var asteroidPosition = new THREE.Vector3();
         asteroid.getWorldPosition(asteroidPosition); // Get asteroid's world position

         if (galactusPosition.distanceTo(asteroidPosition) < 4) { // Check if asteroid is within 4 units of Galactus
            asteroidBelt.remove(asteroid); // Remove asteroid from the belt
         }  
      }

}

/* Single main loop (Lab 2 + Lab 3 + Lab 7 + Lab 8) */
function animate() {
   requestAnimationFrame(animate);
   animateSystem();
   animateDyson();
   animateAsteroidBelt();
   animateGalactus();
   controls.update();
   renderer.render(scene, camera);
}