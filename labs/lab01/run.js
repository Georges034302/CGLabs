//Call the JS functions and run the scripts

setScene();
createCube(2, 2, 2, 0, 1, 0);
createSphere(1, 20, 20, 55, 1, 0);
window.addEventListener('resize', resizeScene);
animate_cube();
animate_sphere();