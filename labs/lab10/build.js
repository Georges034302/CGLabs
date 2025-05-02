
/**
 * Builds a 3D sphere point cloud using Three.js.
 * 
 * This function creates a sphere geometry, assigns random alpha values to its vertices,
 * and applies a custom shader material to render the sphere as a point cloud. The sphere
 * is then added to the scene.
 * 
 * Steps:
 * 1. Creates a sphere geometry with specified radius and detail.
 * 2. Generates a Float32Array of random alpha values for each vertex.
 * 3. Sets the alpha attribute on the geometry.
 * 4. Creates a random color and assigns it to the shader uniforms.
 * 5. Configures a ShaderMaterial with vertex and fragment shaders.
 * 6. Creates a Three.js Points object using the geometry and material.
 * 7. Adds the Points object to the scene.
 * 
 * Dependencies:
 * - Requires Three.js library.
 * - Expects `vertexShader` and `fragmentShader` script elements to exist in the DOM.
 * - Assumes a global `scene` object is available.
 */

function build() {    
    // Code goes here
    geometry = new THREE.SphereBufferGeometry(50, 80, 80);
    var numVertices = geometry.attributes.position.count;   
    var alphas = new Float32Array(numVertices * 1);
    for (var i = 0; i < numVertices; i++) {
        alphas[i] = Math.random();
    }
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    var color = new THREE.Color(Math.random(), Math.random(), Math.random());
    var uniforms = {
        color: { type: 'c', value: color }
    };
    var ShaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true
    });
    cloud = new THREE.Points(geometry, ShaderMaterial);
    scene.add(cloud);
}