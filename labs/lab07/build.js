/* global subd, THREE, size, scene, material_tissue, dat */
var ambientlight;
var cameralight;
var tissue = null;
var material_tissue;
var size = 8;

// The AccessGrid function calculates the index of a vertex in a grid based on its x and y coordinates and the number of subdivisions (subd).
// It uses the formula index = x * subd + y to determine the index in a 1D array representation of the grid.
function AccessGrid(x, y, subd) {
    var index = x * subd + y;
    return index;
}

// The buildVertices function generates a grid of vertices for a 3D mesh.
// It takes a subdivision parameter (subd) that determines the number of vertices in each dimension.
// The function calculates the position of each vertex based on its grid coordinates (i, j) and the specified size of the mesh.
function buildVertices(subd) {
    var step = size / subd;
    const vertices = [];
    for (let i = 0; i < subd; i++)
        for (let j = 0; j < subd; j++) {
            var pos = new THREE.Vector3(i * step, j * step, 0);
            var pos_trans = new THREE.Vector3;
            pos_trans.copy(pos);
            pos_trans.add(new THREE.Vector3(-size / 2, -size / 2, 0));
            var len = 20 * pos_trans.length() / size;
            pos_trans.z = 0.1 * size * Math.cos(len);
            vertices.push(pos_trans.x, pos_trans.y, pos_trans.z);
        }
    return vertices;
}

// The builIndexes function generates the indices for a grid of vertices based on the specified number of subdivisions (subd).
// It creates a series of triangles by connecting adjacent vertices in the grid.
function builIndexes(subd) {
    const indices = [];
    for (let i = 0; i < subd - 1; i++)
        for (let j = 0; j < subd - 1; j++) {
            var Idx0 = AccessGrid(i, j, subd);
            var Idx1 = AccessGrid(i + 1, j, subd);
            var Idx2 = AccessGrid(i + 1, j + 1, subd);
            var Idx3 = AccessGrid(i, j + 1, subd);

            indices.push(Idx1, Idx0, Idx2);
            indices.push(Idx2, Idx0, Idx3);
        }
    return indices;
}

// The buildMesh function creates a 3D mesh using the provided geometry object, indices, and vertices.
// It sets the index and position attributes of the geometry, computes vertex normals, and applies a material to the mesh.
function buildMesh(object, indices, vertices) {
    object.setIndex(indices);
    object.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    object.computeVertexNormals();
    material_tissue = new THREE.MeshPhongMaterial();
    material_tissue.color = new THREE.Color(1, 1, 0.4);
    material_tissue.side = THREE.DoubleSide;
    let mesh = new THREE.Mesh(object, material_tissue);
    mesh.name = "tissue_mesh";
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.geometry.computeVertexNormals();
    return mesh;
}

// The createMesh function initializes a BufferGeometry object, generates vertices and indices for the mesh, and then builds the mesh using the buildMesh function.
// It sets the number of subdivisions (subd) for the mesh and returns the created mesh.
function createMesh() {
    let subd = 100;
    let geom = new THREE.BufferGeometry();
    let vertices = buildVertices(subd);
    let indices = builIndexes(subd);
    tissue = buildMesh(geom, indices, vertices);
    return tissue;
}

// The addLight function creates a point light and an ambient light in the scene.
// The point light is positioned at the camera's location and casts shadows, while the ambient light provides a soft illumination to the scene.
function addLight() {
    cameralight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
    cameralight.castShadow = true;
    ambientlight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
    camera.add(cameralight);
}

// The createSphere function generates a sphere mesh with a specified radius, number of horizontal and vertical lines, and color.
// It uses a MeshPhongMaterial for the sphere's material and sets its wireframe property to true.
function createSphere(radius, hlines, vlines, color) {
    var material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = true;
    material.shininess = 100;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var s = new THREE.Mesh(geometry_sphere, material);
    s.position.z = 2;
    return s;
}

var sphere = createSphere(1.5, 25, 25, 0xff00ff);
//Add all shapes to the scene
function addShapes() {
    scene.add(createMesh());
    scene.add(sphere);
    addLight();
    scene.add(camera);
    scene.add(ambientlight);
}