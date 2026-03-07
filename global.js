// log wrapper for debug
function log(...args) {
   if (!CONSTANTS.debug) return
   console.log(...args)
}

// set watermark to experiment title
;(function () {
   const el = document.getElementById('title')
   el.textContent = el.textContent.replace(
      'Loading',
      document.title.replace(/ canvas things/i, ''),
   )
})()

// supporting functions
function rand({ min = 0, max = null }) {
   if (!max) throw new Error('[fx-rand] No max value provided')
   return Math.floor(Math.random() * (max - min) + min)
}

function randRgb({ alpha = false } = {}) {
   const color = `rgb(${rand({ max: 255 })} ${rand({ max: 255 })} ${rand({ max: 255 })}`

   if (alpha) return `${color} / ${rand({ min: 1, max: 100 })}%)`
   return `${color})`
}

module.exports = {
   rand,
   randRgb,
}
