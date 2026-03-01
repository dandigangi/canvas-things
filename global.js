// Set watermark to experiment title
;(function () {
   const el = document.getElementById('title')
   el.textContent = el.textContent.replace(
      'Loading',
      document.title.replace(/ canvas things/i, ''),
   )
})()

// Supporting functions
function rand(max = null) {
   if (!max) throw new Error('[fx-rand] No max value provided')
   return Math.floor(Math.random() * max + 3)
}

function randRgb() {
   return `rgb(${rand(255)}, ${rand(255)}, ${rand(255)})`
}
