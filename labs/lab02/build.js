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
var sun;   // fixed at origin
var earth; // orbits sun + rotates
var moon;  // orbits earth + tidally locked

/* Define base size constants (formula inputs) */
const SUN_RADIUS = 3; // base size reference
const EARTH_RATIO = 0.5; // Earth radius relative to Sun
const MOON_RATIO = 1 / 3; // Moon radius relative to Earth

/* Define radius orbit formulas */
const EARTH_ORBIT_FACTOR = 3; // Earth orbit = SUN_RADIUS * factor
const MOON_ORBIT_RATIO = 1 / 3; // Moon orbit = Earth orbit * ratio
var earthRadius = SUN_RADIUS * EARTH_RATIO; // Earth radius from Sun radius
var moonRadius = earthRadius * MOON_RATIO; // Moon radius from Earth radius
var earthOrbit = SUN_RADIUS * EARTH_ORBIT_FACTOR; // Earth distance from Sun
var moonOrbit = earthOrbit * MOON_ORBIT_RATIO; // Moon distance from Earth (1/10 Earth-Sun)

    
/* Define the build system function
 * - compute sizes using formulas
 * - compute orbit distances using formulas
 * - create Sun, Earth, Moon using computed values
 * - set initial positions using computed orbit distances
 */
function buildSystem() {
    sun = createSphere(SUN_RADIUS, 48, 48, "#ffff00"); // create Sun
    sun.position.set(0, 0, 0); // Sun fixed at origin

    earth = createSphere(earthRadius, 44, 44, "#00ff00"); // create Earth
    earth.position.set(earthOrbit, 0, 0); // Earth placed using orbit formula

    moon = createSphere(moonRadius, 32, 32, "#c0c0c0"); // create Moon
    moon.position.set(earthOrbit + moonOrbit, 0, 0); // Moon offset from Earth
}

/* Define the add shapes function
 * - build the Sun/Earth/Moon objects
 * - add all objects to the scene
 */
function addShapes() {
    buildSystem(); // create objects
    scene.add(sun); // add Sun
    scene.add(earth); // add Earth
    scene.add(moon); // add Moon
}