import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.z = 5;  

let canvas = document.querySelector('.my-canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(w, h)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshStandardMaterial({ wireframe: true})

let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);

let hemiLight = new THREE.HemisphereLight(0xffffff, 0xfc0404, 0.9);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);