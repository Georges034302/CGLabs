console.log("build.js loaded");
function createSphere(radius, detail, color) {
  const geometry = new THREE.IcosahedronGeometry(radius, detail);
  // const material = new THREE.MeshStandardMaterial({
  //   color: color,
  //   flatShading: true,
  //   wireframe: false,
  // });
  const material = new THREE.MeshBasicMaterial({
    color: color,
  });

  return (sphere = new THREE.Mesh(geometry, material));
}

// function displaceGeometry(geometry, strength) {
//   const position = geometry.attributes.position;
//   for (let i = 0; i < position.count; i++) {
//     const x = position.getX(i);
//     const y = position.getY(i);
//     const z = position.getZ(i);

//     const offset = (Math.random() - 0.5) * strength;
//     const scale = 1 + offset;

//     position.setXYZ(i, x * scale, y * scale, z * scale);
//   }
//   position.needsUpdate = true;
//   geometry.computeVertexNormals();
// }

var earth = createSphere(2, 32, "#00ff00");
var moon = createSphere(1, 32, "#c0c0c0");

function addShapes() {
  // code goes here
  scene.add(earth);
  scene.add(moon);
}

// var pos = geometry.getAttribute("position");
// var posArray = pos.array;

// for (let i = 0; i < posArray.length; i += 3) {
//   posArray[i + 2] += (Math.random() - 0.5) * 0.2;
// }

// pos.needsUpdate = true;
// geometry.computeVertexNormals();
