# Lab 10 – Custom Shaders and GPU Rendering

## Overview

This lab introduces **custom shaders** into the existing Three.js scene developed in previous labs.

Until now, objects such as the Sun, Earth, Moon, asteroids, and Galactus were rendered using **built-in Three.js materials** (MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, etc.).

In this lab, students implement a **custom GPU shader** using **GLSL** and apply it to a **solar emission particle cloud** centered on the Sun.

The cloud is built from a `THREE.BufferGeometry` of 2500 points distributed over a sphere surface. Each particle has a per-vertex alpha attribute that fades slowly as the shell expands outward from the Sun, passing Earth, the asteroid belt, and eventually beyond Galactus before resetting.

This demonstrates how the **programmable graphics pipeline** works and how custom rendering behaviour can be implemented directly on the GPU.

---

## Packages Required for Lab10

```html
<script src="js/three.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/dat.gui.min.js"></script>
<script src="js/OBJLoader.js"></script>
<script src="js/MTLLoader.js"></script>
```

---

## Concepts Introduced

| Topic | Concept |
|---|---|
| Programmable graphics pipeline | Rendering behaviour controlled by GPU programs |
| Vertex shader | GPU program executed once per vertex |
| Fragment shader | GPU program executed once per fragment (pixel) |
| GLSL | OpenGL Shading Language used to write shaders |
| ShaderMaterial | Three.js material that allows custom shaders |
| BufferGeometry | Low-level geometry with manually defined vertex arrays |
| Attributes | Per-vertex data (`alpha`) passed from JavaScript to the vertex shader |
| Uniforms | Global parameters (`color`) shared across all vertices/fragments |
| Varyings | `vAlpha` passed from vertex shader to fragment shader |
| GPU animation | Visual effects driven by per-frame attribute updates |

---

## Scene Behaviour

A solar emission cloud is added to the scene using a custom shader.

The cloud:

- is built from a `THREE.BufferGeometry` with 2500 points on a sphere of radius `4.5`
- is centered on the Sun at `(0, 0, 0)`
- scales outward each frame at growth speed `0.02`
- each particle fades slowly (`alpha *= 0.9985`) with a floor of `0.02`
- resets to full opacity and scale `1.0` once it reaches scale `8.0` (radius ~36, beyond Galactus at 30)
- rotates slowly (`rotation.y += 0.003`) for visual motion

The pulse propagates from the Sun past Earth, through the asteroid belt, and beyond Galactus before restarting.

---

## Shader Definitions (index.html)

### Vertex Shader

```glsl
attribute float alpha;
varying float vAlpha;
void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 2.0;
    gl_Position = projectionMatrix * mvPosition;
}
```

### Fragment Shader

```glsl
uniform vec3 color;
varying float vAlpha;
void main() {
    gl_FragColor = vec4(color, vAlpha);
}
```

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
- Solar emission particle cloud (shader-based, Sun-centered)

The warm orange pulse expands outward from the Sun and fades as it travels past all scene objects.

---

## Script Changes

| Script | Status | Change |
|---|---|---|
| `setup.js` | Same | No change |
| `run.js` | Same | No change |
| `index.html` | Updated | Vertex and fragment shader `<script>` blocks added |
| `build.js` | Updated | `buildShaderCloud()` — `BufferGeometry` + `ShaderMaterial` + `addAttribute` |
| `animate.js` | Updated | `animateCloud()` — scale expansion, alpha fade, reset pulse |

---

## Key Variables

| Variable | Location | Purpose |
|---|---|---|
| `cloud` | build.js | The `THREE.Points` particle object |
| `cloudBaseRadius` | build.js | Initial sphere radius (`4.5`) |
| `cloudScale` | build.js | Current scale multiplier, grows each frame |
| `cloudGrowthSpeed` | animate.js | Scale increment per frame (`0.02`) |
| `cloudMaxScale` | animate.js | Reset threshold (`8.0`) |

---

## Learning Outcome

Students understand:

- how shaders control rendering on the GPU
- how JavaScript passes per-vertex data to GPU shaders via `BufferGeometry` attributes
- how vertex and fragment shaders interact through varyings
- how custom rendering effects are implemented in Three.js
- how shader attributes can drive animated visual effects across an entire scene

This lab provides the foundation for advanced shader programming and lighting models in future graphics exercises.