### figuring out edge detection

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
