# Design System Strategy: The Neon Nebula

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Cosmic Classroom."** 

Education often feels rigid and sterile; gaming often feels chaotic. This system occupies the premium space between the two—an "Editorial Gaming" aesthetic. We move beyond the "template" look by treating the UI as a vast, dark universe where information doesn't sit on a grid, but floats in a coordinated gravitational field. 

We achieve high-end intentionality through:
*   **Intentional Asymmetry:** Breaking the 12-column grid with overlapping glass cards and "floating" headline elements.
*   **Tonal Depth:** Replacing harsh lines with light-source-driven depth.
*   **Vibrant Kineticism:** Using gradients not just as decoration, but as directional cues for the user’s eye.

## 2. Colors & Surface Philosophy
The palette is rooted in the deep void of space, utilizing `surface` and `surface_container` tokens to create a sense of infinite distance.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through background color shifts. For example, a `surface_container_low` section should sit directly on a `surface` background. If you feel the need for a line, use a `24` (8.5rem) vertical spacing gap instead.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of celestial matter. 
*   **Base:** `surface` (#070d1f) is your "Deep Space" layer.
*   **Nesting:** Place a `surface_container` (#11192e) card inside a `surface_container_low` (#0c1326) section. This creates "soft lift" that feels organic to the dark mode environment.

### The "Glass & Gradient" Rule
To achieve the signature look, use `surface_variant` at 40% opacity with a `backdrop-blur` of 20px. 
*   **Primary CTA:** Transition from `primary` (#53ddfc) to `primary_container` (#21bedc) at a 135-degree angle.
*   **Secondary CTA:** Transition from `secondary` (#ec63ff) to `secondary_container` (#a200ba).
*   **Signature Texture:** Apply a subtle radial gradient of `secondary` at 5% opacity in the far corner of the viewport to simulate a distant nebula.

## 3. Typography
We pair the technical, futuristic precision of **Space Grotesk** with the high-readability warmth of **Plus Jakarta Sans**.

*   **Display & Headlines (Space Grotesk):** These should be treated as "Hero Graphics." Use `Extra Bold` or `Black` weights. For `display-lg`, apply a linear gradient from `primary` to `secondary` to create the "Gaming" signature. 
*   **Body & Labels (Plus Jakarta Sans):** Set in `on_surface_variant` (#a5aac2) for standard reading and `on_surface` (#dfe4fe) for emphasis. The lower contrast of the variant color reduces eye strain in dark mode, ensuring the "Educational" aspect of the platform isn't lost to "Gaming" fatigue.

## 4. Elevation & Depth
In this system, light is the architect. We do not use "shadows" in the traditional sense; we use "glows."

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_highest` element implies it is closest to the user (the "HUD" or "Active Task").
*   **Ambient Glows:** For floating elements, replace shadows with a 12% opacity glow using the `surface_tint` (#53ddfc) color. Use a blur radius of at least `64px`. This simulates the light emitted from the screen's neon elements hitting the "glass" of the UI.
*   **The "Ghost Border":** When structural containment is mandatory (e.g., input fields), use the `outline_variant` (#41475b) at 20% opacity. This creates a "barely-there" edge that maintains the glassmorphic aesthetic.

## 5. Components

### Interactive Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`). On hover, scale `1.05x` and increase the `surface_tint` glow intensity.
*   **Tertiary:** No background. Use `primary` text with `label-md` uppercase styling. Hover state triggers a `surface_container_low` glass background.

### Cards & Lists
*   **The Rule of Separation:** Forbid divider lines. Separate list items using a `1.5` (0.5rem) vertical gap and a background shift to `surface_container_low`.
*   **Cards:** Use `xl` (3rem) rounded corners. Content should have a minimum internal padding of `8` (2.75rem) to ensure a high-end, spacious feel.

### Input Fields
*   **Style:** `surface_container_lowest` background with a `Ghost Border`. 
*   **Focus State:** The border transitions to 100% opacity `primary`, and the text cursor inherits the `secondary` color.

### Gaming Progress HUD (Custom Component)
*   **Visual:** A semi-transparent glass bar (`surface_variant` @ 20% opacity) using `full` rounded corners. The progress fill is a kinetic gradient from `primary` to `tertiary`.

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme whitespace. If a layout feels "busy," increase the spacing to the next token (e.g., move from `12` to `16`).
*   **Do** overlap elements. Let a glass card sit 20% over a headline to create a sense of three-dimensional space.
*   **Do** use `secondary` (#ec63ff) sparingly as a "reward" color—for achievements, leveling up, or correct answers.

### Don't:
*   **Don't** use pure white (#ffffff) for body text. It causes "halation" (glowing effect) in dark mode which hurts readability. Always use `on_surface_variant`.
*   **Don't** use 90-degree angles for anything other than the screen edge. This system lives on the `xl` and `2xl` corner radius scale.
*   **Don't** use standard "drop shadows." If it doesn't look like it's emitting light or reflecting it, it doesn't belong in this system.