# Lab 3 --- Dyson Halo (Transformations)

This lab extends **Lab 2 (Sun--Earth--Moon System)** by adding a **Dyson
Halo** around the Sun.

A Dyson Halo is simulated using **small rectangular panels** (scaled
cubes) arranged in a circular ring around the Sun.

Two halos are created:

-   **Halo A** -- horizontal ring
-   **Halo B** -- vertical ring (rotated 90°)

Both halos **rotate around the fixed Sun** while the **Earth and Moon
continue their orbital motion** from Lab 2.

------------------------------------------------------------------------

## Learning Objectives

-   Apply **scaling, translation, and rotation**
-   Combine transformations using **Matrix4**
-   Build structures using **object groups**
-   Animate transformations in the render loop

------------------------------------------------------------------------

## Implementation Overview

Each halo is built from **36 rectangular panels** placed around the Sun.

Panel placement uses:

angle = i \* (2π / n)

Each panel transformation combines:

scale → translate → rotate

The final transformation matrix is applied to each panel.

------------------------------------------------------------------------

## Result

The final scene contains:

-   Sun at the center
-   Earth orbiting the Sun
-   Moon orbiting the Earth
-   Two rotating **Dyson halos made of small silver panels**
