import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;
scene.add(camera)

const textureLoader = new THREE.TextureLoader();
let geometry = new THREE.IcosahedronGeometry(2.4, 20)
let material = new THREE.MeshStandardMaterial({ map: textureLoader.load('/earthlights1k.jpg') })
let earthMesh = new THREE.Mesh(geometry, material)
scene.add(earthMesh)

const hemilight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9);
scene.add(hemilight)

let canvas = document.querySelector('.my-canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

let clock = new THREE.Clock()


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  let time = clock.getElapsedTime()
  earthMesh.rotation.y = time * 0.2;
  earthMesh.rotation.z = time * 0.2;

  controls.update()
}

animate()