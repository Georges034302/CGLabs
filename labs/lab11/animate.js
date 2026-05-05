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

/* -----------------------------------------------------
   LAB 9: Beam timing variables
   - Galactus fires beams for 0.1 seconds
   ----------------------------------------------------- */
var beamActive = false;
var beamDuration = 0.4;
var beamTimer = 0;
var beamCooldown = 0;

/* -----------------------------------------------------
   LAB 9: Galactus eye beam animation
   - when belt reaches x = 22, Galactus fires beams
   - beams stay active for 0.4 seconds
   - asteroids close to Galactus are removed
   ----------------------------------------------------- */
function animateGalactusBeam() {
   // add code here to check if asteroid belt has reached x = 25, activate beams for 0.1 seconds, and remove asteroids close to Galactus while beams are active
   if(typeof galactus === "undefined" || !galactus) return;
   if(typeof asteroidBelt === "undefined" || !asteroidBelt) return;
   if(typeof beamLeft === "undefined" || !beamLeft) return;
   if(typeof beamRight === "undefined" || !beamRight) return;

   scene.updateMatrixWorld();

   var dt = 1/100;

   if(beamCooldown > 0){
      beamCooldown -= dt;
   }

   if(!beamActive && beltRadius >= 22 && beamCooldown <= 0){
      beamActive = true;
      beamTimer = beamDuration;
      beamCooldown = 2;
   }

   if(beamActive){
      beamTimer -= dt;

      beamLeft.visible = true;
      beamRight.visible = true;

      var galactusPosition = new THREE.Vector3();
      galactus.getWorldPosition(galactusPosition);

      var eyeY = galactusPosition.y + 8.6;
      var beamHalf = 6.25;

      var cx = galactusPosition.x - beamHalf*Math.sin(Math.PI/3) + 1;
      var cy = eyeY - beamHalf*Math.cos(Math.PI/3);

      beamLeft.position.set(cx,cy,galactusPosition.z-0.5);
      beamRight.position.set(cx,cy,galactusPosition.z+0.5);

      for(var i=asteroidBelt.children.length-1;i>=0;i--){
         var astroid = asteroidBelt.children[i];

         var asteroidPosition = new THREE.Vector3();
         astroid.getWorldPosition(asteroidPosition);

         if(galactusPosition.distanceTo(asteroidPosition) < 6){
            asteroidBelt.remove(astroid);
         }
      }

      if(beamTimer <= 0){
         beamActive = false;
         beamLeft.visible = false;
         beamRight.visible = false;
      }

   }else{
      beamLeft.visible = false;
      beamRight.visible = false;
   }
}

/* -----------------------------------------------------
   LAB 10: Cloud growth parameters
   - controls pulse expansion speed and reset threshold
   ----------------------------------------------------- */
var cloudGrowthSpeed = 0.02;
var cloudMaxScale = 8.0;

/* -----------------------------------------------------
   LAB 10: Animate solar emission cloud
   - keep cloud centered on the Sun
   - expand outward over time
   - fade alpha while expanding
   - reset when too large
   ----------------------------------------------------- */
function animateCloud() {
   // add code here to animate the solar emission cloud
   if(typeof cloud ==='undefined' || !cloud) return

   cloud.position.set(0,0,0);
   cloudScale += cloudGrowthSpeed;

   cloud.scale.set(cloudScale,cloudScale,cloudScale);

   var alphaAttribute = cloud.geometry.attributes.alpha; // access the pre-config vertex
   var alphas = alphaAttribute.array; // get typed array of 2500 values alpha

   for (var i=0; i < alphas.length; i++){
      alphas[i] *= 0.9985; 
      if (alphas[i] < 0.02){
         alphas[i] = 0.02; //floor opacity
      }
   }

   alphaAttribute.needsUpdate = true;

   cloud.rotation.y += 0.005;

   if(cloudScale >= cloudMaxScale){
      cloudScale = 1;
      cloud.scale.set(cloudScale,cloudScale,cloudScale);

      for(var j=0 ; j < alphas.length; j++){
         alphas[j] = 0.75 + 0.25*Math.random();
      }

      alphaAttribute.needsUpdate = true; 
   }


}

/* -----------------------------------------------------
   LAB 11: Core combat timing + game state variables
   - fireCooldown limits shot rate
   - gameState tracks whether gameplay is active
----------------------------------------------------- */
var fireCooldown = 0.22;
var fireTimer = 0;
var gameState = "playing"; // "playing" | "victory"
var projectileDamage = 10;
var galactusPerishProgress = 0;
var galactusPerishSpeed = 0.24; // progress per second
var rocketImpacts = []; // short-lived splash rings spawned on hit

/* -----------------------------------------------------
   LAB 11: Frame clock for delta-time movement
   - delta time keeps movement smooth across FPS changes
----------------------------------------------------- */
var lab11Clock = new THREE.Clock();

/* -----------------------------------------------------
   LAB 11: Apply Galactus opacity across all mesh parts
   - helper is reused by perish and restart logic
----------------------------------------------------- */
function setLab11GalactusOpacity(alpha) {
   if (!galactus) return;

   galactus.traverse(function(child) {
      if (child instanceof THREE.Mesh && child.material) {
         child.material.transparent = true;
         child.material.opacity = alpha;
         child.material.needsUpdate = true;
      }
   });
}

/* -----------------------------------------------------
   LAB 11: Restart request function (called by Tab key)
   - only restarts when player has already won
----------------------------------------------------- */
function requestLab11Restart() {
   if (gameState === "victory") {
      restartLab11Game();
   }
}

/* -----------------------------------------------------
   LAB 11: Fully reset gameplay state for replay
   - restores health, clears projectiles, resets ship and Galactus
----------------------------------------------------- */
function restartLab11Game() {
   // Remove all active projectiles from scene and array.
   for (var i = projectiles.length - 1; i >= 0; i--) {
      scene.remove(projectiles[i]);
   }
   projectiles = [];

   // Remove active impact splashes so restart starts clean.
   for (var j = rocketImpacts.length - 1; j >= 0; j--) {
      scene.remove(rocketImpacts[j].mesh);
   }
   rocketImpacts = [];

   // Reset gameplay values.
   galactusHealth = galactusMaxHealth;
   fireTimer = 0;
   gameState = "playing";
   galactusPerishProgress = 0;

   // Prevent carry-over input causing immediate actions after restart.
   if (inputState) {
      inputState.fire = false;
   }

   // Hide beams at restart.
   if (beamLeft) beamLeft.visible = false;
   if (beamRight) beamRight.visible = false;

   // Reset ship transform to spawn transform if available.
   if (playerShip && playerShip.userData) {
      if (playerShip.userData.lab11SpawnPosition) {
         playerShip.position.copy(playerShip.userData.lab11SpawnPosition);
      }
      if (playerShip.userData.lab11SpawnRotation) {
         playerShip.rotation.copy(playerShip.userData.lab11SpawnRotation);
      }
   }

   // Restore Galactus to visible baseline transform.
   if (galactus && galactus.userData) {
      galactus.visible = true;
      if (galactus.userData.lab11BasePosition) {
         galactus.position.copy(galactus.userData.lab11BasePosition);
      }
      if (galactus.userData.lab11BaseScale) {
         galactus.scale.copy(galactus.userData.lab11BaseScale);
      }
      if (typeof galactus.userData.lab11BaseRotationY === "number") {
         galactus.rotation.y = galactus.userData.lab11BaseRotationY;
      }
      setLab11GalactusOpacity(1);
   }
}

/* -----------------------------------------------------
   LAB 11: Move and rotate the player spaceship
   - Left/Right arrows rotate the ship around the Y axis (yaw)
   - Up/Down arrows move forward/backward along ship forward axis
   - Q/W moves the ship up/down for altitude control
----------------------------------------------------- */
function animateLab11Player(dt) {
   if (!playerShip || !inputState || gameState !== "playing") return;

   // Yaw control: rotate left/right in place.
   if (inputState.left) {
      playerShip.rotation.y += shipTurnSpeed * dt;
   }
   if (inputState.right) {
      playerShip.rotation.y -= shipTurnSpeed * dt;
   }

   // Build the ship forward vector from its current world rotation.
   var forward = new THREE.Vector3(1, 0, 0);
   forward.applyQuaternion(playerShip.quaternion).normalize();

   // Move forward/backward using the same axis so controls feel consistent.
   if (inputState.forward) {
      playerShip.position.addScaledVector(forward, shipMoveSpeed * dt);
   }
   if (inputState.backward) {
      playerShip.position.addScaledVector(forward, -shipMoveSpeed * dt);
   }

   // Q/W controls altitude (rise/descend).
   if (inputState.rise) {
      playerShip.position.y += shipVerticalSpeed * dt;
   }
   if (inputState.descend) {
      playerShip.position.y -= shipVerticalSpeed * dt;
   }

   // Keep gameplay in a symmetric altitude band around the ecliptic plane.
   playerShip.position.y = THREE.MathUtils.clamp(playerShip.position.y, -shipVerticalLimit, shipVerticalLimit);
}

/* -----------------------------------------------------
   LAB 11: Third-person follow camera update
   - camera trails behind ship using a local-space offset
   - lerp smoothing avoids harsh camera snapping
----------------------------------------------------- */
function animateLab11FollowCamera() {
   if (!playerShip) return;

   // Convert the desired offset from ship-local space to world space.
   var desiredOffset = followOffset.clone().multiplyScalar(followDistanceMultiplier).applyQuaternion(playerShip.quaternion);
   var desiredPosition = playerShip.position.clone().add(desiredOffset);

   // If camera lags too far from the desired point, snap closer so the ship stays visible.
   var cameraLagDistance = camera.position.distanceTo(desiredPosition);
   if (cameraLagDistance > 28) {
      camera.position.copy(desiredPosition);
   } else {
      // Normal case: smoothly move camera toward the desired follow point.
      camera.position.lerp(desiredPosition, followSmoothing);
   }

   // Aim camera slightly above the ship center for better visibility.
   var lookTarget = playerShip.position.clone().add(lookOffset);

   // Enforce a minimum camera distance so the ship never fills the whole screen.
   var toCamera = camera.position.clone().sub(playerShip.position);
   if (toCamera.length() < 7.5) {
      toCamera.setLength(7.5);
      camera.position.copy(playerShip.position.clone().add(toCamera));
   }

   // Keep a consistently zoomed-out chase distance during control.
   var desiredDistance = followOffset.length() * followDistanceMultiplier;
   var currentDistance = camera.position.distanceTo(playerShip.position);
   if (Math.abs(currentDistance - desiredDistance) > 1.0) {
      var away = camera.position.clone().sub(playerShip.position);
      if (away.lengthSq() < 0.0001) {
         away.set(0, 0.6, -1); // fallback direction if camera and ship overlap
      }
      away.normalize();
      camera.position.copy(playerShip.position.clone().addScaledVector(away, desiredDistance));
   }

   camera.lookAt(lookTarget);
}

/* -----------------------------------------------------
   LAB 11: Spawn one projectile at ship nose
   - projectile stores velocity and lifetime in userData
----------------------------------------------------- */
function spawnLab11Projectile() {
   if (!playerShip || gameState !== "playing") return;

   // Rocket body: small cylinder rotated to point along the ship forward axis.
   var geometry = new THREE.CylinderGeometry(0.11, 0.11, 1.1, 10);
   var material = new THREE.MeshBasicMaterial({ color: 0xff7a33 });
   var projectile = new THREE.Mesh(geometry, material);

   // Fire along the ship's forward axis.
   var forward = new THREE.Vector3(1, 0, 0);
   forward.applyQuaternion(playerShip.quaternion).normalize();

   // Start slightly in front of the ship so the bullet does not overlap it.
   projectile.position.copy(playerShip.position).addScaledVector(forward, 2.7);
   projectile.position.y += 0.5;

   // Align rocket to travel direction (cylinder default axis is +Y).
   projectile.quaternion.copy(playerShip.quaternion);
   projectile.rotateZ(-Math.PI / 2);

   projectile.userData.velocity = forward.clone().multiplyScalar(projectileSpeed);
   projectile.userData.life = projectileLifeSeconds;
   projectile.userData.hitRadius = 0.38;
   projectile.userData.prevPosition = projectile.position.clone();

   projectiles.push(projectile);
   scene.add(projectile);
}

/* -----------------------------------------------------
   LAB 11: Spawn rocket splash effect at impact point
   - creates a short-lived expanding ring-like flash
----------------------------------------------------- */
function spawnLab11RocketImpact(position) {
   var impactGeometry = new THREE.SphereGeometry(0.2, 8, 8);
   var impactMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc27a,
      transparent: true,
      opacity: 0.9
   });

   var impactMesh = new THREE.Mesh(impactGeometry, impactMaterial);
   impactMesh.position.copy(position);
   scene.add(impactMesh);

   rocketImpacts.push({
      mesh: impactMesh,
      life: 0.22,
      maxLife: 0.22,
      growth: 7.0
   });
}

/* -----------------------------------------------------
   LAB 11: Animate and remove rocket splash effects
----------------------------------------------------- */
function animateLab11RocketImpacts(dt) {
   for (var i = rocketImpacts.length - 1; i >= 0; i--) {
      var impact = rocketImpacts[i];
      impact.life -= dt;

      // Expand splash quickly and fade out over its short lifetime.
      var ageRatio = 1 - (impact.life / impact.maxLife);
      var splashScale = 1 + impact.growth * ageRatio;
      impact.mesh.scale.set(splashScale, splashScale, splashScale);
      impact.mesh.material.opacity = Math.max(0, 1 - ageRatio);

      if (impact.life <= 0) {
         scene.remove(impact.mesh);
         rocketImpacts.splice(i, 1);
      }
   }
}

/* -----------------------------------------------------
   LAB 11: Handle fire input with cooldown timing
----------------------------------------------------- */
function animateLab11Fire(dt) {
   if (gameState !== "playing") return;

   fireTimer -= dt;

   // Holding Space fires repeatedly, but only when cooldown expires.
   if (inputState.fire && fireTimer <= 0) {
      spawnLab11Projectile();
      fireTimer = fireCooldown;
   }
}

/* -----------------------------------------------------
   LAB 11: Move projectiles and remove expired ones
----------------------------------------------------- */
function animateLab11Projectiles(dt) {
   for (var i = projectiles.length - 1; i >= 0; i--) {
      var projectile = projectiles[i];
      var velocity = projectile.userData.velocity;

      // Save previous position so collision can test swept segment each frame.
      if (!projectile.userData.prevPosition) {
         projectile.userData.prevPosition = projectile.position.clone();
      } else {
         projectile.userData.prevPosition.copy(projectile.position);
      }

      projectile.position.addScaledVector(velocity, dt);
      projectile.userData.life -= dt;

      // Remove old bullets to keep scene updates cheap.
      if (projectile.userData.life <= 0) {
         scene.remove(projectile);
         projectiles.splice(i, 1);
      }
   }
}

/* -----------------------------------------------------
   LAB 11: Projectile vs Galactus collision checks
   - each hit removes one projectile and reduces health
   - reaching zero health switches gameState to victory
----------------------------------------------------- */
function animateLab11Collisions() {
   if (!galactus || gameState !== "playing") return;

   // Strict collision: raycast each rocket segment directly against Galactus triangles.
   var rayCaster = new THREE.Raycaster();

   for (var i = projectiles.length - 1; i >= 0; i--) {
      var projectile = projectiles[i];

      var start = projectile.userData.prevPosition || projectile.position;
      var end = projectile.position;
      var hit = false;
      var hitPoint = end.clone();

      // Sweep test: intersect segment [start, end] with Galactus mesh triangles.
      var segment = end.clone().sub(start);
      var segmentLength = segment.length();

      if (segmentLength > 0.0001) {
         rayCaster.set(start.clone(), segment.clone().normalize());
         rayCaster.near = 0;
         rayCaster.far = segmentLength;

         var intersections = rayCaster.intersectObject(galactus, true);

         if (intersections.length > 0) {
            hit = true;
            hitPoint.copy(intersections[0].point);
         }
      }

      if (hit) {
         // Lock impact to hit location so rocket visually stops at contact point.
         projectile.position.copy(hitPoint);
         spawnLab11RocketImpact(hitPoint);

         scene.remove(projectile);
         projectiles.splice(i, 1);

         galactusHealth = Math.max(0, galactusHealth - projectileDamage);

         if (galactusHealth <= 0) {
            gameState = "victory";
            galactusPerishProgress = 0;
            if (beamLeft) beamLeft.visible = false;
            if (beamRight) beamRight.visible = false;
            break;
         }
      }
   }
}

/* -----------------------------------------------------
   LAB 11: Victory perish animation for Galactus
   - after defeat, Galactus slowly shrinks and fades out
----------------------------------------------------- */
function animateLab11GalactusPerish(dt) {
   if (!galactus || gameState !== "victory") return;
   if (!galactus.userData || !galactus.userData.lab11BaseScale || !galactus.userData.lab11BasePosition) return;

   galactusPerishProgress = Math.min(1, galactusPerishProgress + galactusPerishSpeed * dt);

   var baseScale = galactus.userData.lab11BaseScale;
   var basePosition = galactus.userData.lab11BasePosition;

   // Shrink to 60% while fading to invisible over time.
   var scaleFactor = 1 - 0.4 * galactusPerishProgress;
   galactus.scale.set(baseScale.x * scaleFactor, baseScale.y * scaleFactor, baseScale.z * scaleFactor);

   // Slight downward sink reinforces the perish effect.
   galactus.position.set(basePosition.x, basePosition.y - 2.2 * galactusPerishProgress, basePosition.z);

   setLab11GalactusOpacity(1 - galactusPerishProgress);

   if (galactusPerishProgress >= 1) {
      galactus.visible = false;
   }
}

/* -----------------------------------------------------
   LAB 11: Update HUD values each frame
   - keeps combat feedback visible to the player
----------------------------------------------------- */
function animateLab11Hud() {
   if (!hudHealthValue || !hudStatusValue) return;

   // Keep HUD directly below the current dat.GUI panel height.
   if (typeof positionLab11Hud === "function") {
      positionLab11Hud();
   }

   hudHealthValue.textContent = galactusHealth + " / " + galactusMaxHealth;

   if (gameState === "victory") {
      hudStatusValue.textContent = "win";
   } else {
      hudStatusValue.textContent = "playing";
   }
}


/* Single main loop (Lab 2 + Lab 3 + Lab 7 + Lab 8 + Lab 9 + Lab 10) */
function animate() {
   requestAnimationFrame(animate);
   var dt = Math.min(lab11Clock.getDelta(), 0.05); // clamp to avoid giant jump on tab switch
   animateSystem();
   animateDyson();
   animateAsteroidBelt();
   animateGalactus();
   animateGalactusBeam();
   animateCloud();
   animateLab11Player(dt);
   animateLab11FollowCamera();
   animateLab11Fire(dt);
   animateLab11Projectiles(dt);
   animateLab11Collisions();
   animateLab11RocketImpacts(dt);
   animateLab11GalactusPerish(dt);
   animateLab11Hud();
   controls.update();
   renderer.render(scene, camera);
}