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

    // earth receives the shadow
    earth.receiveShadow = true;
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
    // function to create a star field of small white spheres
    var starGeometry = new THREE.SphereGeometry(0.2, 6, 6);
    var starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var starGroup = new THREE.Group();

    for (let i = 0; i < 1200; i++) {
        var star = new THREE.Mesh(starGeometry, starMaterial);
        
        var x = (Math.random() - 0.5) * 1200; // x between -600 and 600
        var y = (Math.random() - 0.5) * 1200; // y between -600 and 600
        var z = (Math.random() - 0.5) * 1200; // z between -600 and 600
        
        //keep stars away from the center where the solar system is
        if (Math.abs(x) < 80 && Math.abs(y) < 80 && Math.abs(z) < 80) {
            x += (x < 0) ? -120 : 120;
            y += (y < 0) ? -120 : 120;
            z += (z < 0) ? -120 : 120;
        }
        star.position.set(x, y, z);
        starGroup.add(star);
    }
    scene.add(starGroup);
    scene.background = new THREE.Color(0x000000); // set background to black

}

/* -----------------------------------------------------
   LAB 6: Load spaceship PLY model
   - load ufo.ply using PLYLoader
   - compute normals for lighting
   - center the model using bounding box
   - scale the model to fit the scene
   - place the spaceship near the solar system
   - enable shadows on the loaded model
   ----------------------------------------------------- */
function loadSpaceship() {
    // function to load the spaceship model
    var loader = new THREE.PLYLoader();
    loader.load('models/ufo.ply', function(geometry) {
        geometry.computeVertexNormals(); // compute normals for lighting
        geometry.computeBoundingBox(); // compute bounding box for centering

        var center = new THREE.Vector3();
        var size = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);
        geometry.boundingBox.getSize(size);

        geometry.translate(-center.x, -center.y, -center.z); // center the model

        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 40,
            specular: 0x888888
        });

        var loaded_mesh = new THREE.Mesh(geometry, material);
        loaded_mesh.name = "loaded_mesh";

        var targetSize = 5; // target size for scaling
        var scaleFactor = targetSize / Math.max(size.x, size.y, size.z);
        loaded_mesh.scale.set(scaleFactor, scaleFactor, scaleFactor); // scale the model

        loaded_mesh.position.set(-15, 0, 0);

        loaded_mesh.rotation.y = Math.PI / 2; // rotate to face the solar system

        loaded_mesh.castShadow = true; // enable shadow casting
        loaded_mesh.receiveShadow = true; // enable shadow receiving

        scene.add(loaded_mesh);
    });
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
}