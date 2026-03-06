/* Define the create sphere function
 * - create a material object (type MeshBasicMaterial)
 * - set the color for the material object (HEX)
 * - set the wireframe for the material object to true
 * - create the sphere geometry object (radius, hlines, vlines)
 * - create a sphere object from the geometry and material
 * - the function returns a sphere object
 */
function createSphere(radius, hlines, vlines, color) {
     var material = new THREE.MeshBasicMaterial(); // basic material (no lighting)
    material.color = new THREE.Color(color); // set sphere color
    material.wireframe = true; // show wireframe
    var geometry = new THREE.SphereGeometry(radius, hlines, vlines); // create sphere geometry
    var sphere = new THREE.Mesh(geometry, material); // create mesh
    return sphere; // return mesh
}

/* Declare the system objects */
var sun, earth, moon; // the 3 main objects in the system (Sun, Earth, Moon)

/* Dyson halo groups */
var haloA, haloB; // two perpendicular Dyson halos (Lab 3)

/* Define base size constants (formula inputs) */
var SUN_RADIUS = 3; // Sun radius (arbitrary units)
var EARTH_RATIO = 0.5; // Earth radius (arbitrary units)
var MOON_RATIO = 1/3; // Moon radius (arbitrary units)

/* Define radius orbit formulas */
var EARTH_ORBIT_FACTOR = 3; // Earth orbit radius factor (multiplier of Earth radius)
var MOON_ORBIT_FACTOR = 2; // Moon orbit radius factor (multiplier of Earth radius)
var earthRadius = SUN_RADIUS * EARTH_RATIO; // Earth radius (from constant)
var moonRadius = earthRadius * MOON_RATIO; // Moon radius (from constant)
var earthOrbit = 4 + SUN_RADIUS * EARTH_ORBIT_FACTOR; // Earth orbit radius (from formula)
var moonOrbit = earthRadius * MOON_ORBIT_FACTOR; // Moon orbit radius (from formula)

/* Define the build system function
 * - compute sizes using formulas
 * - compute orbit distances using formulas
 * - create Sun, Earth, Moon using computed values
 * - set initial positions using computed orbit distances
 * - add all objects to the scene
 */
function buildSystem() {
    // create Sun (yellow)
    sun = createSphere(SUN_RADIUS, 42, 42, 0xffff00);
    sun.position.set(0, 0, 0); // position Sun at scene center

    // create Earth (dark green)
    earth = createSphere(earthRadius, 32, 32, 0x006400);
    earth.position.set(earthOrbit, 0, 0); // position Earth at initial orbit location

    // create Moon (gray)
    moon = createSphere(moonRadius, 16, 16, 0x888888);
    moon.position.set(earthOrbit + moonOrbit, 0, 0); // position Moon at initial orbit location

    // add objects to the scene
    scene.add(sun);
    scene.add(earth);
    scene.add(moon);
}

/* Define the create halo function (Dyson halo)
 * - create a group of rectangular panels arranged in a ring around the Sun
 * - each panel is created from a unit cube scaled into a thin rectangle
 * - transformation matrices are used to scale, translate and rotate each panel
 * - panels are evenly distributed around the ring
 * - the function returns a halo group object
 */
function createHalo(radius, n, sx, sy, sz) {
    var group = new THREE.Group(); // create an empty group to hold the panels
    var material = new THREE.MeshBasicMaterial(); // basic material (no lighting)
    material.color = new THREE.Color(0x00ffff); // set panel color (cyan)
    material.wireframe = false; // show wireframe
   
    for (var i = 0; i < n; i++) {
        var sca = new THREE.Matrix4(); // scale matrix (thin rectangle)
        var rot = new THREE.Matrix4(); // rotation matrix (rotate panel around Y axis)
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4(); // combined transformation matrix

        sca.makeScale(sx, sy, sz); // scale unit cube into a thin rectangle
        tra.makeTranslation(radius, 0, 0); // translate panel to correct radius from Sun
        rot.makeRotationY(i * 2 * Math.PI / n); // rotate panel to correct angle around ring
        combined.multiply(rot); // apply rotation first
        combined.multiply(tra); // then apply translation
        combined.multiply(sca); // then apply scaling
        
        var geometry = new THREE.BoxGeometry(1, 1, 1); // create unit cube geometry
        var panel = new THREE.Mesh(geometry, material); // create mesh from geometry and material
        panel.matrixAutoUpdate = false; // disable automatic matrix updates
        panel.matrix.copy(combined); // set panel transformation to combined matrix
        group.add(panel); // add panel to the halo group
    }
    return group; // return the halo group
}

/* Define the build Dyson function
 * - compute halo radius so halos stay close to the Sun
 * - create two Dyson halos using createHalo()
 * - rotate the second halo so it is perpendicular to the first
 * - add both halos to the scene
 */
function buildDyson() {
   var haloRadius = SUN_RADIUS * earthRadius; // compute halo radius (from formula)
   var sx = 0.25; // panel scale in x (length)
   var sy = 1.2; // panel scale in y (height)
   var sz = 0.5; // panel scale in z (depth)
   n = 30; // number of panels in each halo
   
   haloA = createHalo(haloRadius, n, sx, sy, sz);
   haloB = createHalo(haloRadius+0.4, n, sx, sy, sz);
   haloB.rotation.x = Math.PI / 2; // rotate second halo to be perpendicular to first
   scene.add(haloA); // add first halo to scene
   scene.add(haloB); // add second halo to scene

}

/* Define the add shapes function
 * - build the Sun/Earth/Moon objects
 * - build the Dyson halo objects (two rings)
 * - add all objects to the scene
 */
function addShapes() {
    buildSystem(); // create and add Sun, Earth, Moon
    buildDyson(); // create and add Dyson halos
}
