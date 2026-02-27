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

/* Define base size constants (formula inputs) */
var SUN_RADIUS = 3; // Sun radius (arbitrary units)
var EARTH_RATIO = 0.5; // Earth radius (arbitrary units)
var MOON_RATIO = 1/3; // Moon radius (arbitrary units)


/* Define radius orbit formulas */
var EARTH_ORBIT_FACTOR = 3; // Earth orbit radius factor (multiplier of Earth radius)
var MOON_ORBIT_FACTOR = 1/3; // Moon orbit radius factor (multiplier of Earth radius)
var earthRadius = SUN_RADIUS * EARTH_RATIO; // Earth radius (from constant)
var moonRadius = earthRadius * MOON_RATIO; // Moon radius (from constant)
var earthOrbit = SUN_RADIUS * EARTH_ORBIT_FACTOR; // Earth orbit radius (from formula)
var moonOrbit = earthRadius * MOON_ORBIT_FACTOR; // Moon orbit radius (from formula)
    
/* Define the build system function
 * - compute sizes using formulas
 * - compute orbit distances using formulas
 * - create Sun, Earth, Moon using computed values
 * - set initial positions using computed orbit distances
 */
function buildSystem() {
    // compute sizes using formulas
    sun = createSphere(SUN_RADIUS, 42, 42, 0xffff00); // create Sun (yellow)
    sun.position.set(0, 0, 0); // position Sun at scene center

    earth = createSphere(earthRadius, 32, 32, 0x0000ff); // create Earth (blue)
    earth.position.set(earthOrbit, 0, 0); // position Earth at initial orbit location

    moon = createSphere(moonRadius, 16, 16, 0x888888); // create Moon (gray)
    moon.position.set(earthOrbit + moonOrbit, 0, 0); // position Moon at initial orbit location
}

/* Define the add shapes function
 * - build the Sun/Earth/Moon objects
 * - add all objects to the scene
 */
function addShapes() {
    buildSystem(); // create Sun, Earth, Moon objects
    scene.add(sun); // add Sun to scene
    scene.add(earth); // add Earth to scene
    scene.add(moon); // add Moon to scene

}