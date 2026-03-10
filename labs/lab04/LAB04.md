# Lab 4 — Lighting and Materials

## Overview

This lab extends **Lab 3** (Sun–Earth–Moon system with Dyson Halos) by introducing **lighting and material models**.

The goal is to demonstrate how light interacts with object surfaces and how material properties affect the colour perceived by the viewer. The underlying lighting equation implemented is:

```
final colour = ambient + diffuse + specular + emission
```

The Lab 3 scene structure and animation are kept intact. Only materials and lights are added/changed.

---

## Learning Objectives

- Add **light sources** (`AmbientLight`, `PointLight`) to a Three.js scene
- Understand the difference between **Lambert (diffuse)** and **Phong (specular)** shading
- Simulate **indirect illumination** using ambient light
- Create a **self-illuminated object** using an emissive material
- Understand which material types respond to lighting vs. `MeshBasicMaterial` (which does not)

---

## Required Scripts

```html
<script src="js/three.js"></script>
<script src="js/OrbitControls.js"></script>
```

---

## File Structure

Same as Lab 3 — no new files are added. Only `build.js` needs material and lighting changes.

| File | Change in Lab 4 |
|---|---|
| `setup.js` | No change |
| `build.js` | Replace materials; add lights |
| `animate.js` | No change |
| `run.js` | No change |

---

## Lab Tasks

### Task 1 — Add Ambient Light

Add a low-intensity **ambient light** to simulate indirect/global illumination.  
This ensures objects are still partially visible even on the side facing away from the Sun.

```js
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
```

Ambient light represents the **global illumination approximation** used in real-time graphics. It has no direction and applies equally to all surfaces.

---

### Task 2 — Add a Point Light at the Sun

Add a **PointLight** at the Sun's position to illuminate the rest of the scene.  
Light radiates outward from the Sun in all directions.

```js
var sunLight = new THREE.PointLight(0xffffff, 1.5);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);
```

This models a **positional light source**. Earth, Moon, and Dyson panels will now receive direct illumination from the Sun.

---

### Task 3 — Make the Sun Emissive

Replace the Sun's `MeshBasicMaterial` with a `MeshStandardMaterial` that has an **emissive colour**, making it appear to glow.

```js
var sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffaa00,
    emissiveIntensity: 1.0
});
```

> The emissive property makes the Sun appear bright independently of lighting, but it does **not** illuminate other objects — that is the job of the `PointLight` added in Task 2.

---

### Task 4 — Use Lambert Material for Earth and Moon

Replace Earth and Moon materials with **`MeshLambertMaterial`** to simulate diffuse reflection.

```js
var earthMaterial = new THREE.MeshLambertMaterial({ color: 0x1a6b1a });
var moonMaterial  = new THREE.MeshLambertMaterial({ color: 0x888888 });
```

Lambert shading models **diffuse (matte) surfaces**. Brightness is proportional to the cosine of the angle between the surface normal and the incoming light direction. This creates a visible **day/night boundary** on each planet.

---

### Task 5 — Use Phong Material for Dyson Panels

Replace the silver Dyson panel material with **`MeshPhongMaterial`** to add specular highlights, simulating a shiny metallic surface.

```js
var panelMaterial = new THREE.MeshPhongMaterial({
    color: 0xC0C0C0,
    specular: 0xffffff,
    shininess: 80
});
```

Phong shading adds a **specular highlight** — a bright spot where the reflected light direction aligns with the viewer direction. The `shininess` value controls how sharp/narrow the highlight is.

---

## Material Summary

| Object | Material | Lighting Component |
|--------|----------|--------------------|
| Sun | `MeshStandardMaterial` (emissive) | Emission |
| Earth | `MeshLambertMaterial` | Diffuse reflection |
| Moon | `MeshLambertMaterial` | Diffuse reflection |
| Dyson panels | `MeshPhongMaterial` | Specular reflection |
| Scene | `AmbientLight` (intensity 0.2) | Indirect illumination |
| Sun light | `PointLight` (at origin) | Direct illumination |

---

## Expected Result

Running the scene should show:

- The Sun glowing yellow regardless of lighting angle (emissive)
- Earth and Moon showing a **bright sunlit side** and a **darker shadow side**
- Dyson panels showing **shiny specular highlights** as they rotate
- No surface is completely black thanks to the ambient light

---

## Entry Point (`run.js`)

No changes required. The call order remains:

```
run()
 ├── setScene()     — scene, camera, renderer, controls
 ├── addShapes()
 │    ├── buildSystem()   — Sun (emissive), Earth (Lambert), Moon (Lambert)
 │    └── buildDyson()    — Halo A, Halo B (Phong)
 ├── resizeScene()  — registered on window resize
 ├── renderer.render()    — draw first static frame
 └── animate()      — start the infinite animation loop
```