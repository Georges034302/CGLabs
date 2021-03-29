setScene();
addLight();
createFloor();
addShapes();
loadModel('models/chopper.ply');
document.addEventListener('mousedown', onDocumentMouseDown, false);
animate();
window.addEventListener('resize', resizeScene);