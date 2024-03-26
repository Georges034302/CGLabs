/* global THREE, cube, scene, camera, renderer */

// Continuous animation required for re-rendering
function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

//Define a function to select and move the PLY
// Use RayCaster to determine intersection of mouse with the PLY
var rayCaster = new THREE.Raycaster();
var selectedObj = false; //boolean flag

function onDocumentMouseDown(event) {
    var mouse = new THREE.Vector2();

    mouse.x = (event.clientX/renderer.domElement.clientWidth)*2 -1;
    mouse.y = -(event.clientY/renderer.domElement.clientHeight)*2 +1;

    rayCaster.setFromCamera(mouse,camera);
    var intersects = rayCaster.intersectObjects(scene.children,false);

    if(intersects.length > 0){
        if((intersects[0].object.name === "loaded_mesh") && !selectedObj){
            mesh.material.color = new THREE.Color(1,1,0.5);
            selectedObj = true;
        }
        if((intersects[0].object.name !== "loaded_mesh") && selectedObj){
            mesh.material.color = new THREE.Color(0.6,0.2,0.4);
            var pos = intersects[0].point;
            mesh.position.x = pos.x;
            mesh.position.y = pos.y;
            selectedObj = false;
        }
    }
}