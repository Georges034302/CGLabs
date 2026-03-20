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

    var group = new THREE.Group(); // group that stores all halo panels

    // create a silver material shared by all panels
    var material = new THREE.MeshBasicMaterial({
        color: 0xC0C0C0, // silver colour
        wireframe: false
    });

    for (let i = 0; i < n; i++) {

        // transformation matrices
        var sca = new THREE.Matrix4(); // scale matrix
        var rot = new THREE.Matrix4(); // rotation matrix
        var tra = new THREE.Matrix4(); // translation matrix
        var combined = new THREE.Matrix4(); // final transformation matrix

        // scale cube into a thin rectangular panel
        sca.makeScale(sx, sy, sz);

        // move panel outward from the Sun
        tra.makeTranslation(radius, 0, 0);

        // rotate around Y to distribute panels in a circle
        rot.makeRotationY(i * (2 * Math.PI / n));

        // combine transformations
        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(sca);

        // create panel mesh
        var geometry = new THREE.BoxGeometry(1,1,1);
        var panel = new THREE.Mesh(geometry, material);

        panel.matrixAutoUpdate = false;
        panel.matrix.copy(combined);

        group.add(panel);
    }

    return group;
}

/* Define the build Dyson function
 * - compute halo radius so halos stay close to the Sun
 * - create two Dyson halos using createHalo()
 * - rotate the second halo so it is perpendicular to the first
 * - add both halos to the scene
 */
function buildDyson() {

    // keep halo well inside Earth's orbit
    var haloRadius = SUN_RADIUS + earthRadius;

    // smaller rectangular panels
    var sx = 0.25;
    var sy = 1.2;
    var sz = 0.5;

    // create horizontal halo
    haloA = createHalo(haloRadius, 36, sx, sy, sz);
    scene.add(haloA);

    // create vertical halo
    haloB = createHalo(haloRadius + 0.4, 36, sx, sy, sz);
    haloB.rotation.x = Math.PI / 2;
    scene.add(haloB);
}

/* Define the Lab 4 lights function
 * - add ambient light to simulate indirect illumination
 * - add a point light at the Sun position
 */
function addLights() {
    // add ambient light to simulate indirect illumination
    var ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // add a point light at the Sun position
    var pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 0); // Sun's position
    scene.add(pointLight);

}

/* Define the Lab 4 materials function
 * - replace the Sun material with an emissive material
 * - replace Earth and Moon materials with Lambert materials
 * - replace Dyson panel materials with a Phong material
 */
function applyLab4Materials() {
    // Sun: emissive material to make it appear self-illuminated
    sun.material = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00 });

    // Earth and Moon: Lambert materials to respond to lighting
    earth.material = new THREE.MeshLambertMaterial({ color: 0x006400 });
    moon.material = new THREE.MeshLambertMaterial({ color: 0x888888 });

    // Dyson panels: Phong material for shiny appearance
    haloA.children.forEach(panel => {
        panel.material = new THREE.MeshPhongMaterial({ color: 0xC0C0C0, shininess: 100 });
    });
    haloB.children.forEach(panel => {
        panel.material = new THREE.MeshPhongMaterial({ color: 0xC0C0C0, shininess: 100 });
    });
}

// Define the Lab 5 shadows function
// - enable shadow casting and receiving for the Sun, Earth, Moon
function enableShadows() {
    var sunLight = scene.children.find(obj => obj instanceof THREE.PointLight); // find the point light (Sun's light)

    if(sunLight) {
        sunLight.castShadow = true; // enable shadow casting for the Sun's light
    }

    moon.castShadow = true; // enable shadow casting for the Moon
    moon.receiveShadow = true; // enable shadow receiving for the Moon

    earth.castShadow = true;
    earth.receiveShadow = true; // enable shadow receiving for the Earth
}

// Define the Lab 5 shadings function
// - apply flat shading to the Moon to give it a faceted appearance
function applyLab5Shadings() {
    moon.material.flatShading = true; // enable flat shading for the Moon
    moon.material.needsUpdate = true; // update material to apply changes
}

/* Define the add shapes function
 * - build the Sun/Earth/Moon objects
 * - build the Dyson halo objects (two rings)
 * - add all objects to the scene
 * - add Lab 4 lights
 * - apply Lab 4 materials
 */
function addShapes() {
    buildSystem(); // create and add Sun, Earth, Moon
    buildDyson();  // create and add Dyson halos
    addLights();   // Lab 4: add lighting
    applyLab4Materials(); // Lab 4: apply lighting-aware materials

    // Lab 5: enable shadows and flat shading
    enableShadows(); // enable shadow casting and receiving
    applyLab5Shadings(); // apply flat shading to the Moon
}