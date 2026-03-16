// Experiment: playing
import * as THREE from 'three'

export default function run(container) {
   const back = document.createElement('button')
   back.textContent = 'Go Back'
   back.className = 'experiment-back-button'
   back.onclick = () => {
      window.location.search = ''
      window.location.hash = ''
   }
   document.body.appendChild(back)

   const scene = new THREE.Scene()
   scene.background = new THREE.Color(0x000000)

   const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
   )
   camera.position.z = 5

   const renderer = new THREE.WebGLRenderer()
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.setAnimationLoop(animate)
   container.appendChild(renderer.domElement)

   const ambient = new THREE.AmbientLight(0xffffff, 0.3)
   scene.add(ambient)

   const point = new THREE.PointLight(0xffffff, 20)
   point.position.set(2, 3, 5)
   scene.add(point)

   const geometry = new THREE.BoxGeometry(1, 1, 1)
   const material = new THREE.MeshStandardMaterial({ color: 0x4a90d9 })
   const cube = new THREE.Mesh(geometry, material)
   scene.add(cube)

   function animate(time) {
      cube.rotation.x = time / 2000
      cube.rotation.y = time / 1000
      renderer.render(scene, camera)
   }
}

