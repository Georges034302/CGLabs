# Lab 11 - Third-Person Spaceship Combat

## Overview

This lab extends the existing solar system and Galactus scenario into an interactive third-person combat exercise.

Students take direct control of the PLY spaceship, fly through the scene with a follow camera, and fire projectiles at Galactus. Each successful hit reduces Galactus health until it reaches zero.

The focus of this lab is real-time gameplay systems in Three.js: input handling, camera following, projectile updates, collision checks, and state-driven UI feedback.

---

## Packages Required for Lab11

```html
<script src="js/three.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/PLYLoader.js"></script>
<script src="js/dat.gui.min.js"></script>
<script src="js/OBJLoader.js"></script>
<script src="js/MTLLoader.js"></script>
```

---

## Concepts Introduced

| Topic | Concept |
|---|---|
| Player control | Keyboard-driven movement and rotation of a 3D ship |
| Third-person camera | Camera follows a moving target with smoothing |
| Projectile system | Spawn, update, and remove bullets over time |
| Cooldown logic | Time-gated firing to control shot rate |
| Collision detection | Projectile-to-target hit testing with bounding volumes |
| Combat state | Health tracking and death condition handling |
| HUD updates | Real-time on-screen health and game status text |

---

## Scene Behaviour

The Lab 10 scene remains intact (Sun, Earth, Moon, asteroid belt, Galactus, and shader cloud), with combat gameplay layered on top.

Core behaviour:

- player controls the spaceship movement in third person
- follow camera tracks behind the ship and keeps Galactus engagement visible
- pressing fire creates projectiles from the ship front
- projectiles travel forward and expire after a short lifetime
- hits on Galactus reduce health
- at zero health, Galactus enters a defeated state and the player wins

---

## Controls

- `W` / `S`: move forward / backward
- `A` / `D`: yaw left / right
- `Space`: fire projectile
- mouse: optional camera look adjustment (if enabled)

---

## Script Changes

| Script | Status | Change |
|---|---|---|
| `setup.js` | Updated | input listeners, camera follow rig, movement constants |
| `build.js` | Updated | player combat setup, Galactus health data, HUD references |
| `animate.js` | Updated | movement update, camera follow, projectile logic, hit detection, win state |
| `run.js` | Updated | initialize Lab 11 systems and launch main loop |

---

## Key Variables

| Variable | Location | Purpose |
|---|---|---|
| `playerShip` | build.js | controlled spaceship object |
| `inputState` | setup.js | current keyboard input state |
| `projectiles` | build.js | active projectile list |
| `fireCooldown` | animate.js | minimum delay between shots |
| `galactusHealth` | build.js | current boss health |
| `galactusMaxHealth` | build.js | max boss health for HUD scaling |
| `gameState` | animate.js | gameplay phase (`playing`, `victory`, `defeat`) |

---

## Learning Outcome

Students understand:

- how to convert a static graphics scene into an interactive gameplay loop
- how to combine input, camera motion, and object updates each frame
- how projectile and collision systems are structured in real-time 3D apps
- how simple boss logic and health systems can be integrated into Three.js
- how to present gameplay state through a minimal HUD

This lab bridges graphics rendering work with real-time interaction and game mechanics.