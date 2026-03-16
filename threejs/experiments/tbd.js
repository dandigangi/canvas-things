import * as THREE from 'three'

const CONSTANTS = {
   colors: {
      white: 0xffffff,
      charcoal: 0x333333,
      skyBlue: 0x4a90d9,
      coral: 0xe8614a,
      gold: 0xf5a623,
      crimson: 0xdc143c,
      emerald: 0x2ecc71,
      purple: 0x9b59b6,
      orange: 0xff6b35,
      teal: 0x1abc9c,
      pink: 0xff69b4,
      navy: 0x1a237e,
      lime: 0xc6f135,
      lavender: 0xb39ddb,
      amber: 0xffbf00,
   },
}

function randomColor() {
   const values = Object.values(CONSTANTS.colors)
   return values[Math.floor(Math.random() * values.length)]
}

export default function run(container) {
   const scene = new THREE.Scene()
   scene.background = new THREE.Color(0x000000)
   const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
   )

   const renderer = new THREE.WebGLRenderer()
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.setAnimationLoop(animate)
   container.appendChild(renderer.domElement)

   const geometry = [
      new THREE.BoxGeometry(1, 1.3, 1),
      new THREE.BoxGeometry(1.1, 1, 1.8),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.BoxGeometry(1.1, 1, 1.8),
      new THREE.BoxGeometry(1, 1, 1),
   ]

   camera.position.z = 6.3

   const cube = new THREE.Mesh(
      geometry[0],
      new THREE.MeshStandardMaterial({ color: randomColor() }),
   )
   const cube2 = new THREE.Mesh(
      geometry[1],
      new THREE.MeshStandardMaterial({ color: randomColor() }),
   )
   const cube3 = new THREE.Mesh(
      geometry[2],
      new THREE.MeshStandardMaterial({ color: randomColor() }),
   )
   const cube4 = new THREE.Mesh(
      geometry[3],
      new THREE.MeshStandardMaterial({ color: randomColor() }),
   )
   const cube5 = new THREE.Mesh(
      geometry[4],
      new THREE.MeshStandardMaterial({ color: randomColor() }),
   )

   scene.add(cube)
   scene.add(cube2)
   scene.add(cube3)
   scene.add(cube4)
   scene.add(cube5)

   const light = new THREE.PointLight(0xffffff, 10)
   light.position.set(5, 1, 3)
   scene.add(light)

   const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
   scene.add(ambientLight)

   function animate(time) {
      cube.rotation.x = time / 3000
      cube.rotation.y = time / 1000
      cube.scale.x = 1
      cube.scale.y = 1.4
      cube.position.x = 1
      cube.position.y = 1
      cube.position.z = 0.3
      cube.scale.setScalar(1 + Math.sin(time / 1000) * 0.3)

      cube2.rotation.x = time / -2000
      cube2.rotation.y = time / -1000
      cube2.scale.x = 0.5
      cube2.scale.y = 0.9
      cube2.position.x = 2
      cube2.position.y = 2
      cube2.position.z = 2
      cube2.scale.setScalar(1 + Math.sin(time / 500) * 0.3)

      cube3.rotation.x = time / 500
      cube3.rotation.y = time / 500
      cube3.scale.x = 0.3
      cube3.scale.y = 1
      cube3.position.x = 2
      cube3.position.y = -1
      cube3.position.z = 0
      cube3.scale.setScalar(1 + Math.sin(time / 2000) * 0.3)

      cube4.rotation.x = time / 1500
      cube4.rotation.y = time / 1000
      cube4.scale.x = 0.3
      cube4.scale.y = 1
      cube4.position.x = -2
      cube4.position.y = -1
      cube4.position.z = 0
      cube4.scale.setScalar(1 + Math.sin(time / 500) * 0.3)

      cube5.rotation.x = time / 500
      cube5.rotation.y = time / 500
      cube5.scale.x = 0.65
      cube5.scale.y = 0.6
      cube5.position.x = -2
      cube5.position.y = -3
      cube5.position.z = 0.5
      cube5.scale.setScalar(1 + Math.sin(time / 2000) * 0.3)

      // Clone: camera orbits in opposite direction
      camera.position.x = Math.sin(time / 2000) * -8
      camera.position.z = Math.cos(time / 2000) * -8
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
   }
}
