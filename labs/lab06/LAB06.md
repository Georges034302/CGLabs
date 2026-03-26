# Lab 6 — Loading and Interacting with 3D Models

## Overview

This lab builds on **Lab 5 (Shading and Shadows)** by introducing **external 3D mesh models**, a **star field background**, and **basic mouse interaction**.

Students will load a **PLY UFO model (`ufo.ply`)**, integrate it into the existing solar-system scene, and interact with it using **mouse picking with a raycaster**.

The existing **Sun–Earth–Moon system, Dyson halos, lighting, shading, and shadows** remain unchanged.

---

## Learning Objectives

- Load an external **PLY mesh model** in Three.js
- Compute **vertex normals** for proper shading
- Normalize a mesh using **bounding box centering and scaling**
- Add a **star field** to create a space background
- Use **raycasting** to detect mouse selection
- Move a selected object interactively using a **move plane**

---

## Required Scripts

```html
<script src="js/three.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/PLYLoader.js"></script>
```

---

## File Structure

| File | Purpose |
|---|---|
| `setup.js` | Creates the scene, camera, renderer, OrbitControls, and raycaster interaction |
| `build.js` | Loads the UFO model, adds star field, and integrates with existing system |
| `animate.js` | Runs the animation loop — unchanged from Lab 5 |
| `run.js` | Entry point — unchanged from Lab 5 |

---

## Starting Point

Use your **Lab 5 project**. Add the UFO model to your project:

```
models/
  ufo.ply
```

---

## Task 1 — Add a Star Field

In **`build.js`**, create an `addStarField()` function that:

- Creates 1200 small white spheres (`SphereGeometry`, radius `0.35`) using `MeshBasicMaterial`
- Distributes them randomly in a `1200 × 1200 × 1200` space
- Keeps stars at least 80 units away from the solar system centre
- Groups them into a `THREE.Group` and adds it to the scene
- Sets `scene.background` to black (`0x000000`)

---

## Task 2 — Load the UFO Model

In **`build.js`**, declare `var loaded_mesh` at the top, then create a `loadSpaceship()` function that:

1. Uses `THREE.PLYLoader` to load `models/ufo.ply`
2. Calls `geometry.computeVertexNormals()` for correct lighting
3. Calls `geometry.computeBoundingBox()`, gets `center` and `size`
4. Translates the geometry to the origin using `geometry.translate(-center.x, -center.y, -center.z)`
5. Creates a `MeshPhongMaterial` (white, specular `0x888888`, shininess `40`)
6. Sets `scaleFactor = 5 / Math.max(size.x, size.y, size.z)` and applies it via `mesh.scale.set()`
7. Positions the UFO at `(-15, 5, 0)` and rotates it `Math.PI / 2` on Y
8. Enables `castShadow` and `receiveShadow`
9. Sets `mesh.name = "loaded_mesh"` and adds to scene

---

## Task 3 — Declare Raycaster Variables

In **`setup.js`**, declare these variables before `setScene()`:

| Variable | Type | Purpose |
|---|---|---|
| `rayCaster` | `THREE.Raycaster` | Casts a ray from camera through mouse position |
| `mouse` | `THREE.Vector2` | Stores normalised device coordinates of the click |
| `selectedObj` | object / null | Tracks whether the UFO is currently selected |
| `movePlane` | `THREE.Plane` | The z = 0 plane used to compute the drop position |

`movePlane` is defined as `new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)`.

---

## Task 4 — Register the Mouse Click Event

In **`setup.js`**, inside `setScene()`, register the mouse listener on the document:

```javascript
document.addEventListener("mousedown", onDocumentMouseDown, false);
```

---

## Task 5 — Implement Two-Click Interaction

In **`setup.js`**, define `onDocumentMouseDown(event)`:

1. Convert the mouse position to **normalised device coordinates (NDC)**
2. Call `rayCaster.setFromCamera(mouse, camera)`
3. **First click** — if no object is selected, test `rayCaster.intersectObject(loaded_mesh, true)`; if hit, set `selectedObj` and change colour to red (`0xff0000`)
4. **Second click** — if an object is selected, intersect the ray with `movePlane` to get `dropPoint`; move `selectedObj.position` to `dropPoint`, restore colour to white (`0xffffff`), clear `selectedObj`

Interaction flow:

1. **Click UFO** → selected, turns **red**
2. **Click elsewhere** → UFO moves to the z = 0 plane at that point, returns to **white**

---

## Expected Result

When running the scene:

- Black space background with 1200 randomly placed stars
- The existing Sun–Earth–Moon system with lighting and shadows
- Dyson halos continuing to rotate
- A UFO loaded from `ufo.ply` — properly sized, positioned at `(-15, 5, 0)`
- Clicking the UFO **selects** it (turns red)
- Clicking elsewhere **moves** the UFO to that position (restores white)

---

## File Changes Summary

| File | Change |
|---|---|
| `setup.js` | Raycaster variables; `mousedown` listener in `setScene()`; `onDocumentMouseDown()` |
| `build.js` | `addStarField()`; `loadSpaceship()` — both called from `addShapes()` |
| `animate.js` | No change |
| `run.js` | No change |

---

## Entry Point (`run.js`)

```
run()
 ├── setScene()     — scene, camera, renderer (shadow map), controls,
 │                    raycaster variables + mousedown listener
 ├── addShapes()
 │    ├── buildSystem()         — Sun, Earth, Moon
 │    ├── buildDyson()          — Halo A, Halo B
 │    ├── addLights()           — AmbientLight + PointLight
 │    ├── applyLab4Materials()  — materials
 │    ├── enableShadows()       — Lab 5: shadow flags on light + objects
 │    ├── applyLab5Shading()    — Lab 5: flat shading on Moon
 │    ├── addStarField()        — Lab 6: 1200 stars + black background
 │    └── loadSpaceship()       — Lab 6: PLY load, normalise, shadow
 ├── resizeScene()  — registered on window resize
 ├── renderer.render()          — draw first static frame
 └── animate()      — start animation loop
```