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

/* -----------------------------------------------------
   LAB 6: Declare loaded model variable
   - stores the imported spaceship mesh
   ----------------------------------------------------- */
var loaded_mesh;

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

        var sca = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var combined = new THREE.Matrix4();

        sca.makeScale(sx, sy, sz);
        tra.makeTranslation(radius, 0, 0);
        rot.makeRotationY(i * (2 * Math.PI / n));

        combined.multiply(rot);
        combined.multiply(tra);
        combined.multiply(sca);

        var geometry = new THREE.BoxGeometry(1,1,1);
        var panel = new THREE.Mesh(geometry, material);

        panel.matrixAutoUpdate = false;
        panel.matrix.copy(combined);

        group.add(panel);
    }

    return group;
}

/* Define the build Dyson function */
function buildDyson() {

    var haloRadius = SUN_RADIUS + earthRadius;

    var sx = 0.25;
    var sy = 1.2;
    var sz = 0.5;

    haloA = createHalo(haloRadius, 36, sx, sy, sz);
    scene.add(haloA);

    haloB = createHalo(haloRadius + 0.4, 36, sx, sy, sz);
    haloB.rotation.x = Math.PI / 2;
    scene.add(haloB);
}

/* Define the Lab 4 lights function */
function addLights() {
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    var sunLight = new THREE.PointLight(0xffffff, 1.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
}

/* Define the Lab 4 materials function */
function applyLab4Materials() {
    sun.material = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffaa00,
        emissiveIntensity: 1.0
    });

    earth.material = new THREE.MeshLambertMaterial({
        color: 0x006400
    });

    moon.material = new THREE.MeshLambertMaterial({
        color: 0x888888
    });

    var phongPanelMaterial = new THREE.MeshPhongMaterial({
        color: 0xC0C0C0,
        specular: 0xffffff,
        shininess: 80
    });

    haloA.children.forEach(function(panel) {
        panel.material = phongPanelMaterial;
    });

    haloB.children.forEach(function(panel) {
        panel.material = phongPanelMaterial;
    });
}

/* -----------------------------------------------------
   LAB 5: Enable shadow casting and receiving
   - configure light and objects for shadow rendering
   ----------------------------------------------------- */
function enableShadows() {

    // find the point light created in addLights()
    var sunLight = scene.children.find(obj => obj instanceof THREE.PointLight);

    if (sunLight) {
        sunLight.castShadow = true;
    }

    // moon blocks sunlight
    moon.castShadow = true;
    // moon receives shadow from Earth
    moon.receiveShadow = true;

    // earth receives the shadow
    earth.receiveShadow = true;
    // earth also casts shadow on the moon
    earth.castShadow = true;
}

/* -----------------------------------------------------
   LAB 5: Demonstrate flat shading
   - Moon uses flat shading to show faceted surface
   ----------------------------------------------------- */
function applyLab5Shading() {

    moon.material.flatShading = true;
    moon.material.needsUpdate = true;
}

/* -----------------------------------------------------
   LAB 6: Create star field dots
   - create many small white spheres
   - spread them far around the scene
   - stars are simple meshes, no textures used
   ----------------------------------------------------- */
function addStarField() {
    var starGeometry = new THREE.SphereGeometry(0.35, 6, 6);
    var starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var starGroup = new THREE.Group();

    for (var i = 0; i < 1200; i++) {
        var star = new THREE.Mesh(starGeometry, starMaterial);

        var x = (Math.random() - 0.5) * 1200;
        var y = (Math.random() - 0.5) * 1200;
        var z = (Math.random() - 0.5) * 1200;

        // keep stars away from the solar system centre
        if (Math.abs(x) < 80 && Math.abs(y) < 80 && Math.abs(z) < 80) {
            x += (x < 0 ? -120 : 120);
            y += (y < 0 ? -120 : 120);
            z += (z < 0 ? -120 : 120);
        }

        star.position.set(x, y, z);
        starGroup.add(star);
    }

    scene.add(starGroup);
    scene.background = new THREE.Color(0x000000);
}

/* -----------------------------------------------------
   LAB 6: Load spaceship PLY model
   - load ship.ply using PLYLoader
   - compute normals for lighting
   - center the model using bounding box
   - scale the model to fit the scene
   - place the spaceship near the solar system
   - enable shadows on the loaded model
   ----------------------------------------------------- */
function loadSpaceship() {
    var loader = new THREE.PLYLoader();

    loader.load("models/ufo.ply", function(geometry) {

        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        var center = new THREE.Vector3();
        var size = new THREE.Vector3();

        geometry.boundingBox.getCenter(center);
        geometry.boundingBox.getSize(size);

        // center geometry around its own origin
        geometry.translate(-center.x, -center.y, -center.z);

        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x888888,
            shininess: 40
        });

        loaded_mesh = new THREE.Mesh(geometry, material);
        loaded_mesh.name = "loaded_mesh";

        /* LAB 6: make spaceship clearly visible
           - use a larger fixed target size than before
           - this avoids the ship becoming too tiny */
        var targetSize = 5;
        var scaleFactor = targetSize / Math.max(size.x, size.y, size.z);
        loaded_mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // place spaceship in the scene
        loaded_mesh.position.set(-15, 5, 0);

        // orient spaceship for better visibility
        loaded_mesh.rotation.y = Math.PI / 2;

        // enable shadows
        loaded_mesh.castShadow = true;
        loaded_mesh.receiveShadow = true;

        scene.add(loaded_mesh);
    });
}

/* -----------------------------------------------------
   LAB 7: Declare asteroid belt variables
   - asteroidBelt stores all generated asteroids
   - belt parameters are controlled by GUI
   ----------------------------------------------------- */
var asteroidBelt;
var beltRadius = earthOrbit + 6;   // place belt beyond Earth orbit
var beltWidth = 4;                 // radial thickness of belt
var asteroidCount = 180;           // number of asteroids
var asteroidSize = 0.3;            // average asteroid size
var rotationSpeed = 0.002;         // belt rotation speed
var gui;

/* -----------------------------------------------------
   LAB 7: Build procedural asteroid belt
   - generate many small asteroids around the Sun
   - distribute them using polar coordinates
   - apply random scaling for irregular shapes
   ----------------------------------------------------- */
function buildAsteroidBelt() {

    // add code here to build the asteroid belt using the parameters defined above
    if (asteroidBelt) {
        scene.remove(asteroidBelt);
    }
    
    asteroidBelt = new THREE.Group();

    for (var i = 0; i < asteroidCount; i++) {
        var angle = Math.random() * 2 * Math.PI;
        var radius = beltRadius + (Math.random() - 0.5) * beltWidth;
        var y = (Math.random() - 0.5) * 1.2; // small vertical variation

        var geometry = new THREE.SphereGeometry(1, 8, 8);
        var material = new THREE.MeshPhongMaterial({ color: 0x888888 });

        var asteroid = new THREE.Mesh(geometry, material);
        asteroid.position.set(radius * Math.cos(angle), y, radius * Math.sin(angle));

        var sx = asteroidSize * (0.5 + Math.random()); // random scale for irregularity
        var sy = asteroidSize * (0.5 + Math.random());
        var sz = asteroidSize * (0.5 + Math.random());
        asteroid.scale.set(sx, sy, sz);

        asteroid.castShadow = true;
        asteroid.receiveShadow = true;

        asteroidBelt.add(asteroid);
    }
    scene.add(asteroidBelt);
}

/* -----------------------------------------------------
   LAB 7: Build GUI controls
   - allow interactive control of asteroid belt parameters
   - rebuild the belt when geometry parameters change
   ----------------------------------------------------- */
function buildGui() {

    // add code here to create a dat.GUI interface for controlling the asteroid belt parameters defined above
    gui = new dat.GUI();

    var params = {
        beltRadius: beltRadius,
        beltWidth: beltWidth,
        asteroidCount: asteroidCount,
        asteroidSize: asteroidSize,
        rotationSpeed: rotationSpeed
    };

    gui.add(params, 'beltRadius', earthOrbit + 2, earthOrbit + 15).onChange(function(value) {
        beltRadius = value;
        buildAsteroidBelt();
    });
    gui.add(params, 'beltWidth', 1, 10).onChange(function(value) {
        beltWidth = value;
        buildAsteroidBelt();
    });
    gui.add(params, 'asteroidCount', 50, 500).step(1).onChange(function(value) {
        asteroidCount = value;
        buildAsteroidBelt();
    });
    gui.add(params, 'asteroidSize', 0.1, 1).onChange(function(value) {
        asteroidSize = value;
        buildAsteroidBelt();
    });
    gui.add(params, 'rotationSpeed', 0.001, 0.01).onChange(function(value) {
        rotationSpeed = value;
    });

    gui.open();

}

/* Define the add shapes function */
function addShapes() {
    buildSystem();
    buildDyson();
    addLights();
    applyLab4Materials();

    /* Lab 5 additions */
    enableShadows();
    applyLab5Shading();

    /* Lab 6 additions */
    addStarField();
    loadSpaceship();

    /* Lab 7 additions */
    buildAsteroidBelt();
    buildGui();
}