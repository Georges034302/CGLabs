## Lab 3 Objectives
* Create group of cubes [36]
* Create 4 types of cube transformations (2 rotations, scaling, and translation)
* Create one combined the transformation Matrix
* Configure the following transformations:
```
    sca.makeScale(0.5, 3, 1.5)
    rot2.makeRotationZ(i * (Math.PI / n))
    tra.makeTranslation(10, 5, 0)
    rot.makeRotationY(i * (2 * Math.PI / n))
```
* Combine the transformations into the combined Matrix
* Set a random color for each cube
* Apply the combined Matrix to each cube in the collection
* Animate the cubes to rotate around the x and z
* Animate the color change for each cube randomly
* Apply control to the Frame speed

## Lab 3 Bonus Objectives
* Replace the cubes with 20 moons
* Add earth at the center of 20 moons
* Animate the earth around y-axis
* Animate the moons around y-axis
* Apply transformations, random color change, FPS control same as primary objective

### Packages Required for Lab03
```
<script src="js/three.js"></script>
<script src="js/OrbitControls.js"> </script>
```