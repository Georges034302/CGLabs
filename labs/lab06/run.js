setScene();
addShapes();
// Load PLY model from source
loadModel('/models/aircraftcarrier.ply');
//add event listener to the HTML document on mouse-down
addEventListener('mousedown', onDocumentMouseDown, false);
animate();
window.addEventListener('resize', resizeScene);