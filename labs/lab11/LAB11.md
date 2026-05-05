# Lab 11 - Third-Person Spaceship Combat

## Overview

This lab extends the existing solar system and Galactus scenario into an interactive third-person combat exercise.

Students take direct control of the PLY spaceship, fly through the scene with a third-person follow camera, and fire rockets at Galactus. Each successful hit reduces Galactus health until it reaches zero.

The focus of this lab is real-time gameplay systems in Three.js: input handling, camera following, projectile updates, tighter collision checks, and state-driven HUD feedback.

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
| Player control | Keyboard-driven movement, yaw, and altitude control |
| Third-person camera | Zoomed-out follow camera with smoothing and distance enforcement |
| Projectile system | Spawn, update, and remove rockets over time |
| Cooldown logic | Time-gated firing to control shot rate |
| Collision detection | Segment raycast against Galactus mesh triangles for strict hit registration |
| Combat state | Health tracking and death condition handling |
| HUD updates | Two-line scoreboard (`health`, `status`) plus a separate controls panel |

---

## Scene Behaviour

The Lab 10 scene remains intact (Sun, Earth, Moon, asteroid belt, Galactus, and shader cloud), with combat gameplay layered on top.

Core behaviour:

- player controls spaceship movement in third person (including altitude up/down)
- follow camera tracks behind the ship and stays zoomed out during control
- pressing fire launches rockets from the ship front
- rockets travel forward and expire after a short lifetime
- rockets only register hits when they intersect Galactus geometry
- on hit, rockets stop and spawn a brief splash effect (no penetration)
- at zero health, Galactus enters a defeated state, slowly perishes (fade + shrink), and the player wins
- pressing `Tab` after victory resets the fight and restores Galactus

---

## Controls

- `Arrow Up` / `Arrow Down`: move forward / backward
- `Arrow Left` / `Arrow Right`: yaw left / right
- `Q` / `W`: move up / down
- `Space`: fire rockets
- `Tab` (victory only): restart combat

---

## Script Changes

| Script | Status | Change |
|---|---|---|
| `setup.js` | Updated | keyboard listeners, follow-camera constants, movement/altitude tuning |
| `build.js` | Updated | player combat setup, Galactus state data, styled scoreboard + controls panel |
| `animate.js` | Updated | movement update, follow camera, rocket logic, strict collision checks, splash impacts, perish/restart state |
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
| `gameState` | animate.js | gameplay phase (`playing`, `victory`) |
| `galactusPerishProgress` | animate.js | defeat animation progress from 0 to 1 |
| `rocketImpacts` | animate.js | active splash effects for rocket hit feedback |

---

## Learning Outcome

Students understand:

- how to convert a static graphics scene into an interactive gameplay loop
- how to combine input, camera motion, and object updates each frame
- how rocket and collision systems are structured in real-time 3D apps
- how simple boss logic and health systems can be integrated into Three.js
- how to present gameplay state through a compact HUD and controls panel

This lab bridges graphics rendering work with real-time interaction and game mechanics.