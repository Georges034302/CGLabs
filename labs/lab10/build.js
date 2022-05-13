function build() {
    // point cloud geometry
    geometry = new THREE.SphereBufferGeometry(50, 80, 80);

    // add an attribute
    var numVertices = geometry.attributes.position.count;

    //set the cloud geometry
    var alphas = new Float32Array(numVertices * 1);
    //populate the float array alphas
    for (var i = 0; i < numVertices; i++) {
        alphas[i] = Math.random();
    }
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    // set the cloud color
    var color = new THREE.Color(0xffffff);
    color.setHex(Math.random() * 0xffffff);
    uniforms = {
        color: {
            value: color
        },
    };
    // set cloud shader material
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true
    });

    // create the cloud from points
    cloud = new THREE.Points(geometry, shaderMaterial);
    //add the cloud to the scene
    scene.add(cloud);
}