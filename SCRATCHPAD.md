### figuring out edge detection (gen rects 1)

- generate positions
- check for edge (x,y)
- cant be greater than max
- how do i do the math correctly/efficiently, x/y is top corner for rects
- example 100x100 canvas, 90xpos, 20x20 size = 10 past cxt width so f(x) xpos + width cant be greater than canvas width
- force to edge its going over (x,y)

const canWidth = 100
const canHeight = 100
const x = 90
const y = 300
const width = 20
const height = 20

if (x + width > canWidth || x >= canWidth) {
console.log('edge detected')
console.log('over by', canWidth - (x + width))
console.log('new pos', canWidth - width)
}

good enough to code now

### clicks (gen rects 1)

if i want clicks to gen, ill need a scene/state manager since everything would need to be repainted as before w/ the addition. would also mean extraction of edge detection. might need a canvas specific set of utils to keep the code clean.

click, grab x/y, run edge detection, update as needed, redraw. could also do the opposite detecting previous paints if mouse click hits to remove. state manager will be critical if i go down these paths.

better to move on from this experiment and deeper into canvas abilities (especially animation). clicks can always be a later effort or separate experiement. lets do that.

### anim trail

on move, gen a rect, and then animate it down until 0 opacity. thinking... draw at x/y pos at time of move... then animate. not clicking yet how to do this.

took a minute to get something basic going. not sure why the confusion w/ this one as much. need to work on cancelling and set of state shapes to gen more trails.
