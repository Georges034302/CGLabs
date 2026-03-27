# Computer Graphics Labs --- Three.js

🔗 **Live Labs:**\
https://georges034302.github.io/CGLabs/

------------------------------------------------------------------------

## Overview

This repository contains a series of **Computer Graphics labs developed
using Three.js**.\
The labs demonstrate fundamental concepts in **3D graphics
programming**, including:

-   scene creation
-   object geometry
-   transformations
-   animation
-   hierarchical modelling
-   orbital systems

Each lab progressively introduces new graphics concepts while reusing
the structure of previous labs.

------------------------------------------------------------------------

## About Three.js

**Three.js** is a JavaScript library used to create and display **3D
graphics in the browser** using **WebGL**.

It provides high‑level abstractions for common graphics components such
as:

-   **Scenes** -- containers that hold objects in a 3D world\
-   **Cameras** -- define the viewpoint of the scene\
-   **Meshes** -- objects created from geometry and materials\
-   **Lights** -- illumination sources\
-   **Animation loops** -- continuously update and render scenes

Three.js simplifies WebGL development by providing an intuitive
object‑oriented API for building interactive 3D applications.

------------------------------------------------------------------------

## Repository Structure

    CGLabs
    │
    ├─ index.html
    ├─ js
    │   └─ three.js
    │
    └─ labs
        ├─ Lab1
        ├─ Lab2
        ├─ Lab3
        └─ ...

Each lab contains its own JavaScript files that build and animate a
Three.js scene.

------------------------------------------------------------------------

## Lab Topics

### Lab 1

Introduction to **Three.js scene setup**.

Concepts: - renderer - camera - scene - basic geometry

### Lab 2

**Sun--Earth--Moon system simulation**.

Concepts: - orbital motion - hierarchical relationships - animation
loops

### Lab 3

**Dyson Halo Transformations**.

Concepts: - transformation matrices - object grouping - scaling,
translation, rotation - procedural geometry

Two rotating Dyson halos made of small panels are constructed around a
fixed Sun.

### Lab 4

**Lighting and Materials**.

Concepts: - ambient light - point light sources - diffuse shading
(Lambert) - specular reflection (Phong) - emissive materials

Extends Lab 3 by adding lighting models to demonstrate how light
interacts with surfaces and how material properties affect perceived
colour.

### Lab 5

**Shading and Shadows**.

Concepts: - flat vs smooth shading - surface normals - shadow mapping
- shadow casting and receiving - solar and lunar eclipses

Builds on Lab 4 by enabling shadow rendering and configuring objects to
cast and receive shadows. Demonstrates how the Moon blocks light to
create shadows on the Earth, simulating a solar eclipse, and how the
Earth's shadow falls on the Moon, simulating a lunar eclipse.

### Lab 6

**Loading and Interacting with 3D Models**.

Concepts: - external model loading (PLY format) - vertex normals
- bounding box centering and scaling - star field background - raycasting
- interactive object selection and movement

Builds on Lab 5 by loading an external UFO 3D model, adding a star field
background, and implementing mouse-based interaction to select and move
the UFO around the scene using raycasting.

------------------------------------------------------------------------

## Learning Goals

These labs introduce core computer graphics principles:

-   3D coordinate systems
-   object transformations
-   scene graphs
-   animation loops
-   hierarchical modelling

All examples run directly in the browser using **Three.js and WebGL**.
