# Lab 08 - Textured Asset Integration and Runtime Compatibility

## Overview

Lab 08 extends the previous scene by loading a textured OBJ/MTL character model and adding interaction between that model and the Lab 07 asteroid belt.

This lab also introduces runtime compatibility shims to keep legacy loader code working with newer Three.js APIs.

## Implemented Features

1. OBJ/MTL model loading with `MTLLoader` and `OBJLoader`
2. Robust fallback path logic for model loading
3. Auto-centering and scaling using a bounding box
4. Animated asteroid consumption behavior
5. Compatibility shims for deprecated Three.js APIs used by older loaders

## Actual Asset Files Used

Lab 08 currently loads the following files from the `models` directory:
- `Librarian.obj.mtl`
- `Librarian.obj`

The loader retries multiple base paths to avoid path issues depending on how the page is served:
- `/models/`
- `models/`
- `../../models/`

## Script Responsibilities

### `build.js`

- Defines `galactus` as a scene object reference
- Loads MTL then OBJ using the selected model base path
- Preloads material definitions before OBJ load
- Centers and scales the model to a consistent world size
- Positions and rotates the model near the asteroid belt
- Enables cast/receive shadows on model meshes

### `animate.js`

- Adds `animateGalactus()` to the main loop
- Computes world position for Galactus and each asteroid
- Removes asteroids whose distance to Galactus is below the threshold (`< 4`)

### `setup.js`

- Adds `applyLab8CompatibilityShims()` to bridge removed/renamed APIs:
  - `Quaternion.inverse()` -> `invert()`
  - `BufferGeometry.addAttribute()` -> `setAttribute()`
  - `XHRLoader` -> `FileLoader`
  - `Loader.Handlers` compatibility using `DefaultLoadingManager`
  - `material.shading` alias -> `flatShading`

### `run.js`

- Calls `applyLab8CompatibilityShims()` once at startup before scene construction

## Runtime Flow

```text
run()
  -> applyLab8CompatibilityShims()
  -> setScene()
  -> addShapes()
       -> ...Lab 1-7 content...
       -> loadGalactus()
  -> animate()
       -> animateSystem()
       -> animateDyson()
       -> animateAsteroidBelt()
       -> animateGalactus()
```

## Notes

- The loaded model variable is still named `galactus` for continuity with the lab exercise narrative.
- Labs 09 and 10 are currently placeholders at the app level and do not load runtime scene scripts yet.