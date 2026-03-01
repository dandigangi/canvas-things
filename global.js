// set watermark to experiment title
;(function () {
   const el = document.getElementById('title')
   el.textContent = el.textContent.replace(
      'Loading',
      document.title.replace(/ canvas things/i, ''),
   )
})()

// supporting functions
function rand(max = null) {
   if (!max) throw new Error('[fx-rand] No max value provided')
   return Math.floor(Math.random() * max + 5)
}

function randRgb({ alpha = false } = {}) {
   const color = `rgb(${rand(255)} ${rand(255)} ${rand(255)}`

   if (alpha) {
      return `${color} / ${rand(100)}%)`
   }

   return `${color})`
}
