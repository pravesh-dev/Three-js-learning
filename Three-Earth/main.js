import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import getStarField from './getStarField.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;
// scene.add(camera)

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const textureLoader = new THREE.TextureLoader();
let geometry = new THREE.IcosahedronGeometry(2.4, 20)
let material = new THREE.MeshStandardMaterial({ map: textureLoader.load('/earthmap1k.jpg') })
let earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh)

let stars = getStarField({numStars: 3000});
scene.add(stars)

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
  earthMesh.rotation.y = time * 0.04;
  earthMesh.rotation.z = time * 0.04;

  controls.update()
}

animate()