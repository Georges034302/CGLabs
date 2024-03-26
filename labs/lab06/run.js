setScene();
addShapes();
loadModel("/models/chopper.ply");
// Add Mouse Listener in the HTML Document
document.addEventListener('mousedown',onDocumentMouseDown,false);
animate();
window.addEventListener('resize', resizeScene);