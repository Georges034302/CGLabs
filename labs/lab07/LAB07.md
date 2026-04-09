# Lab 7 — Procedural Asteroid Belt and GUI Control

## Overview

This lab extends **Lab 6 (Loading and Interacting with 3D Models)** by introducing **procedural geometry generation** and **interactive parameter control**.

In **Lab 6**, the spaceship was **loaded from an external mesh file (PLY)**.  
In **Lab 7**, we will **generate a new scene component mathematically**: an **asteroid belt beyond Earth’s orbit**.

Students will also introduce a **dat.GUI control panel** to modify asteroid belt parameters in real time.

---

## What We Already Have from Lab 6

The scene currently contains:

| Component | Description |
|---|---|
| Sun–Earth–Moon system | Procedural spheres with orbital animation |
| Dyson halos | Procedural panel rings around the Sun |
| Lighting and shadows | Ambient + PointLight with shadows |
| Star field | Randomly generated background stars |
| Spaceship | Loaded PLY model that can be selected and moved |
| Mouse interaction | Raycasting used to select and reposition the spaceship |

---

## What Lab 7 Adds

Lab 7 introduces two key ideas:

1. **Procedural shape generation** — objects created using mathematical rules rather than imported meshes.
2. **Interactive parameter control** — using **dat.GUI** to modify scene parameters.

The new scene component is a **procedurally generated asteroid belt**.

---

## Asteroid Belt Concept

The asteroid belt is created by placing many small asteroid meshes around the Sun **beyond Earth’s orbit**.

Asteroid positions are computed using **polar coordinates**.

```
x = r * cos(θ)
z = r * sin(θ)
y = small random height offset
```

Where:

```
θ = random angle between 0 and 2π
r = beltRadius + random offset
```

This produces a **ring-shaped distribution of asteroids**.

Each asteroid is a small geometry such as:

```
THREE.SphereGeometry
```

To create irregular shapes, each asteroid is randomly scaled:

```
scale.x = random
scale.y = random
scale.z = random
```

---

## GUI Controls

A **dat.GUI interface** allows interactive control of asteroid belt parameters.

| Parameter | Effect |
|---|---|
| `beltRadius` | Distance of the belt from the Sun |
| `beltWidth` | Thickness of the asteroid belt |
| `asteroidCount` | Number of asteroids generated |
| `asteroidSize` | Average asteroid size |
| `rotationSpeed` | Rotation speed of the belt |

Changing values updates the scene in real time.

---

## Packages Required for Lab07

```html
<script src="js/three.js"></script>
<script src="js/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/dat.gui.min.js"></script>
```

---

## File Structure

| File | Purpose |
|---|---|
| `setup.js` | Scene, camera, renderer, controls, raycasting |
| `build.js` | Solar system objects, spaceship, asteroid belt generation, GUI |
| `animate.js` | Animation loop and asteroid belt rotation |
| `run.js` | Program entry point |

---

## Implementation Tasks

### Task 1 — Create Asteroid Belt

Add a function in **build.js**:

```
buildAsteroidBelt()
```

This function:

- creates many asteroid meshes
- distributes them in a ring around the Sun
- stores them in a `THREE.Group`
- adds the group to the scene

---

### Task 2 — Animate the Belt

Update **animate.js** so the asteroid belt slowly rotates:

```js
asteroidBelt.rotation.y += rotationSpeed;
```

---

### Task 3 — Add GUI Controls

Add a **dat.GUI control panel inside `build.js`** that allows the user to adjust asteroid belt parameters.

---

## Updated Program Flow

```
run()
├ setScene()
├ addShapes()
│ ├ buildSystem()
│ ├ buildDyson()
│ ├ addLights()
│ ├ loadSpaceship()
│ ├ buildAsteroidBelt()   (new)
│ └ buildGui()            (new)
├ resizeScene()
└ animate()
```

---

## File Changes Summary

| File | Change |
|---|---|
| `setup.js` | No change |
| `build.js` | Add procedural asteroid belt generation and GUI |
| `animate.js` | Add asteroid belt rotation |
| `run.js` | No change |

---

## Expected Result

When running the scene:

- The Sun–Earth–Moon system continues to animate
- Dyson halos rotate
- The spaceship can still be selected and moved
- A **procedurally generated asteroid belt** appears beyond Earth’s orbit
- The asteroid belt slowly rotates around the Sun
- GUI sliders allow interactive modification of belt parameters

---
