# Lab 5 — Shading and Shadows

## Overview

This lab builds on **Lab 4 (Lighting and Materials)** by introducing **shading behaviour and shadow casting**.

Students observe how lighting is computed across surfaces and how objects can **block light to create shadows**.

The existing **Sun–Earth–Moon system and Dyson halos** remain unchanged. Only shadow configuration and shading parameters are added.

---

## Learning Objectives

- Understand the difference between **flat shading** and **smooth shading**
- Observe how **surface normals affect lighting**
- Enable **shadow rendering** in Three.js
- Configure objects to **cast and receive shadows**
- Observe a **solar eclipse effect** when the Moon blocks the Sun's light

---

## Required Scripts

```html
<script src="js/three.js"></script>
<script src="js/OrbitControls.js"></script>
```

---

## File Structure

| File | Purpose |
|---|---|
| `setup.js` | Creates the scene, camera, renderer, and OrbitControls |
| `build.js` | Builds all scene objects and applies lighting and materials |
| `animate.js` | Runs the animation loop — orbits, spin, tidal lock, halo rotation |
| `run.js` | Entry point — wires setup, build, and animate together |

---

## Starting Point

Use your **Lab 4 project** as-is — no structural changes required.

---

## Task 1 — Enable Shadow Rendering

Shadows require enabling shadow mapping on the renderer.

In **`setup.js`**, add this line after the renderer is created:

```javascript
renderer.shadowMap.enabled = true;
```

This activates the Three.js shadow system globally.

---

## Task 2 — Enable Sun Light Shadow Casting

The Sun's `PointLight` must be configured to cast shadows.

In **`build.js`**, inside `addLights()`, after creating `sunLight`:

```javascript
sunLight.castShadow = true;
```

This allows the light to produce shadow projections from blocking objects.

---

## Task 3 — Configure Objects for Shadows

Individual objects must be opted in to either cast or receive shadows.

In **`build.js`**, inside `applyLab4Materials()` or at the end of `addShapes()`:

```javascript
moon.castShadow     = true;
earth.receiveShadow = true;
```

When the Moon passes between the Sun and Earth, its shadow is projected onto the Earth's surface — simulating a **solar eclipse**.

---

## Task 4 — Demonstrate Flat Shading

Modify the Moon's material to use flat shading to contrast with the Earth's smooth shading.

In **`build.js`**, inside `applyLab4Materials()`, after setting the Moon's material:

```javascript
moon.material.flatShading  = true;
moon.material.needsUpdate  = true;
```

The Moon will appear faceted (per-face shading), while the Earth remains smoothly shaded — clearly demonstrating the difference between the two shading models.

---

## Expected Result

When running the scene:

- The Sun illuminates the entire system via `PointLight`
- The Moon casts a shadow onto the Earth (Solar Eclipse)
- The Earth casrs a shadow onto the Moon (Lunar Eclipse)
- The Moon surface shows **flat shading** (faceted)
- The Earth surface shows **smooth shading** (interpolated)

---

## File Changes Summary

| File | Change |
|---|---|
| `setup.js` | `renderer.shadowMap.enabled = true` |
| `build.js` | `sunLight.castShadow = true`; `moon.castShadow = true`; `earth.receiveShadow = true`; flat shading on Moon |
| `animate.js` | No change |
| `run.js` | No change |

---

## Entry Point (`run.js`)

```
run()
 ├── setScene()     — scene, camera, renderer (shadow map enabled), controls
 ├── addShapes()
 │    ├── buildSystem()         — Sun, Earth, Moon
 │    ├── buildDyson()          — Halo A, Halo B
 │    ├── addLights()           — AmbientLight + PointLight (castShadow)
 │    └── applyLab4Materials()  — materials + shadow flags + flat shading
 ├── resizeScene()  — registered on window resize
 ├── renderer.render()          — draw first static frame
 └── animate()      — start animation loop
```