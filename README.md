# Computer Graphics Labs - Three.js

Live labs:
https://georges034302.github.io/CGLabs/

## Overview

This repository contains a progressive set of browser-based computer graphics labs built with Three.js.

The labs cover:
- scene setup and rendering
- object modeling and transforms
- orbital animation
- lighting, materials, and shadows
- loading external models
- interaction with raycasting
- textured OBJ/MTL assets
- graphics pipeline interaction effects

## How Lab Selection Works

The root page uses a shared selector and loader:
- pick a lab from the top-left dropdown
- the page updates `?lab=XX` in the URL
- scripts for that lab are loaded in order: `setup.js`, `build.js`, `animate.js`, `run.js`

Examples:
- `?lab=01` to `?lab=08`: fully implemented labs
- `?lab=09`: graphics pipeline interaction lab (Galactus beam scenario)
- `?lab=10`: placeholder state with a "coming soon" message
- no `lab` parameter: neutral landing page with prompt to select a lab

## Repository Structure

```text
CGLabs/
    index.html
    css/
        layout.css
    js/
        three.js
        lab-loader.js
        ...
    labs/
        lab01/
        lab02/
        ...
        lab10/
```

## Lab Progression

1. Lab 01: Three.js scene, camera, renderer basics
2. Lab 02: Sun-Earth-Moon orbital animation
3. Lab 03: Dyson halo transformations and grouping
4. Lab 04: Lighting and material models
5. Lab 05: Shadows and flat/smooth shading behavior
6. Lab 06: PLY model loading and raycast interaction
7. Lab 07: Procedural asteroid belt with GUI controls
8. Lab 08: Textured OBJ/MTL loading and asteroid-consumption interaction
9. Lab 09: Graphics pipeline interaction (Galactus eye-beam concept and asteroid removal flow)
10. Lab 10: Coming soon

## Tech Stack

- Three.js
- Vanilla JavaScript
- dat.GUI
- OBJ/MTL and PLY model loaders

## Learning Goals

- understand core real-time 3D rendering workflow
- build and animate hierarchical scenes
- apply lighting, shading, and shadow techniques
- load and place external assets reliably
- implement simple interactive simulation behavior
