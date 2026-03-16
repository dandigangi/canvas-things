const EXPERIMENTS = [{ id: 'intro', label: 'Intro' }, { id: 'playing', label: 'Playing' }]

function getExperimentId() {
   const params = new URLSearchParams(location.search)
   const fromQuery = params.get('exp')
   if (fromQuery) return fromQuery
   const fromHash = location.hash.slice(1)
   if (fromHash) return fromHash
   return null
}

function getContainer() {
   let el = document.getElementById('experiment-container')
   if (!el) {
      el = document.createElement('div')
      el.id = 'experiment-container'
      document.body.appendChild(el)
   }
   el.replaceChildren()
   return el
}

function renderExperimentList() {
   const container = getContainer()
   container.innerHTML = ''
   const heading = document.createElement('h1')
   heading.textContent = 'Experiments'
   container.appendChild(heading)
   const list = document.createElement('ul')
   for (const { id, label } of EXPERIMENTS) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = `?exp=${id}`
      a.textContent = label
      li.appendChild(a)
      list.appendChild(li)
   }
   container.appendChild(list)
}

function ensureBackButton() {
   let btn = document.querySelector('.experiment-back-button')
   if (!btn) {
      btn = document.createElement('button')
      btn.textContent = 'Go Back'
      btn.className = 'experiment-back-button'
      btn.onclick = () => {
         window.location.search = ''
         window.location.hash = ''
      }
      document.body.appendChild(btn)
   }
}

function removeBackButton() {
   const btn = document.querySelector('.experiment-back-button')
   if (btn && btn.parentNode) {
      btn.parentNode.removeChild(btn)
   }
}

async function runExperiment(id) {
   ensureBackButton()
   const container = getContainer()
   try {
      const mod = await import(`./experiments/${id}.js`)
      const run = mod.default
      if (typeof run !== 'function') {
         container.textContent = `Experiment "${id}" has no default export function.`
         return
      }
      run(container)
   } catch (err) {
      container.textContent = `Failed to load experiment "${id}": ${err.message}`
      console.error(err)
   }
}

const experimentId = getExperimentId()
if (experimentId) {
   // In experiment view; make sure list styles don't add padding
   runExperiment(experimentId)
} else {
   removeBackButton()
   renderExperimentList()
}
