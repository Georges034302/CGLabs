
//build a sphere from vertex and fragments
function build() {
    // point cloud geometry
    geometry = new THREE.SphereBufferGeometry(50,80,80);

    // add an attribute
    var numVertics = geometry.attributes.position.count;

    //set the cloud geometry
    var alphas = new Float32Array(numVertics*1); // 1 indicates how many numVertices you have

    //populate the float array alphas
    for(var i=0;i< numVertics; i++){
        alphas[i] = Math.random();
    }
    geometry.setAttribute('alpha',new THREE.BufferAttribute(alphas,1));

    // set the cloud color (random)
    var color = new THREE.Color(0xffffff);
    color.setHex(Math.random()*0xffffff);
    uniforms = {
        color:{
            value: color
        }
    }

    // set cloud shader material - get vertex and fragment from HTML document
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true
    });

    // create the cloud from points
    cloud = new THREE.Points(geometry,material);
    
    //add the cloud to the scene
    scene.add(cloud);
    
}