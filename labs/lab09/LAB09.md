# Lab 09 – Graphics Pipeline Interaction (Galactus Beam)

## Overview

This lab extends the previous scene by introducing **interactive rendering effects** related to the **graphics pipeline**.

A visual effect is added where **Galactus fires a red energy beam from his eyes** to destroy nearby asteroids.

The beam activates when the asteroid belt expands close to Galactus.

This demonstrates **scene interaction, fragment generation, and dynamic object removal during rendering**.

---

## Packages Required for Lab09

```html
<script src="js/three.js"></script>
<script src="js/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/dat.gui.min.js"></script>
<script src="js/OBJLoader.js"></script>
<script src="js/MTLLoader.js"></script>
```

---

## Concepts Introduced

| Topic | Concept |
|---|---|
| Rendering pipeline | Visual output generated from scene primitives |
| Rasterization | Geometry converted to fragments/pixels |
| Fragment operations | Objects affecting final rendered pixels |
| Scene interaction | Objects influencing other objects |
| Dynamic rendering | Real-time updates during animation |
| GPU rendering behaviour | Visual effects produced through fragment generation |

---

## Scene Behaviour

Galactus is positioned at:

- `x = 30`

When the asteroid belt expands near Galactus:

- `beltRadius ≥ 25`

Galactus begins firing red energy beams from his eyes.

**Beam properties:**

| Property | Value |
|---|---|
| Color | Red |
| Duration | 0.1 seconds |
| Interval | Every few seconds |
| Effect | Nearby asteroids are destroyed |

---

## Visual Result

The scene now contains:

- Sun
- Earth
- Moon
- Dyson Halo
- Asteroid Belt
- Spaceship
- Galactus (textured asset)
- Red beam effect from Galactus eyes

When asteroids approach Galactus, the beam activates and removes them from the scene.

---

## Script Changes

| Script | Status | Change |
|---|---|---|
| `setup.js` | Same | No change |
| `build.js` | Updated | Create Galactus beam object |
| `animate.js` | Updated | Beam firing logic and asteroid removal |
| `run.js` | Same | No change |

---

## Learning Outcome

Students understand:

- how dynamic effects interact with rendered objects
- how rendering updates occur during the animation loop
- how scene objects can trigger visual effects
- how geometry removal affects the rendered scene