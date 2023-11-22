## Bouncing Circle with p5.js

In this tutorial, you will learn how to create a simple animation using p5.js, a popular JavaScript library for creative coding. We will create a canvas where a single red circle bounces around the edges, changing direction upon hitting the canvas boundary.

## Key Concepts
- **Canvas Creation**: Initializing a canvas in p5.js.
- **Animation Loop**: Utilizing the `draw` function for continuous rendering.
- **Collision Detection**: Reversing the circle's direction upon hitting canvas edges.
- **Responsive Design**: Dynamically resizing the canvas based on the window size.

## Step 1: Setting Up the Canvas
p5.js uses the `setup` function to initialize the canvas. We create a canvas that fills the width of its container.

```javascript
function setup() {
    let canvasDiv = document.getElementById('p5-canvas');
    let divWidth = canvasDiv.offsetWidth;
    let canvas = createCanvas(divWidth, 400);
    canvas.parent('p5-canvas');
}
```
This code snippet creates a canvas within the `div` with an ID of `p5-canvas`. The canvas width matches the `div` width, and its height is set to 400 pixels.

## Step 2: Initializing the Circle
We declare global variables to track the circle's position and speed. The circle starts in the center of the canvas, moving at a constant speed.

```javascript
let x, y;
let xSpeed, ySpeed;
let diameter = 50;

// Initialize position and speed
x = width / 2;
y = height / 2;
xSpeed = 3;
ySpeed = 3;
```

## Step 3: Drawing and Moving the Circle
The `draw` function, which p5.js calls repeatedly, is used to animate the circle. It updates the circle's position and renders it.

```javascript
function draw() {
    background(220); // Set background color

    // Update the circle's position
    x += xSpeed;
    y += ySpeed;

    // Draw the circle
    fill("red");
    ellipse(x, y, diameter);
}
```

## Step 4: Handling Collisions
To make the circle bounce off the edges, we reverse its direction when it reaches the canvas boundary.

```javascript
// Reverse direction if hitting canvas edges
if (x > width - diameter / 2 || x < diameter / 2) {
    xSpeed *= -1;
}
if (y > height - diameter / 2 || y < diameter / 2) {
    ySpeed *= -1;
}
```

## Step 5: Responsive Canvas
To ensure the canvas size adjusts when the window is resized, we use the `windowResized` function.

```javascript
function windowResized() {
    let canvasDiv = document.getElementById('p5-canvas');
    let divWidth = canvasDiv.offsetWidth;
    resizeCanvas(divWidth, 400);
}
```

<div id="canvas-1" style="width: 100%"></div>

<script src="/scripts/bounce.js" id="script-1">
 </script>
