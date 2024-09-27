import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;
// scene.add(camera)

let canvas = document.querySelector('.my-canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

let geometry = new THREE.BoxGeometry(1, 1, 2)
let material = new THREE.MeshStandardMaterial({flatShading: true, color: 0xffffff })

let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);

let hemiLight = new THREE.HemisphereLight(0xffffff, 0xfc0404, 0.9);
scene.add(hemiLight);


let clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  
  let time = clock.getElapsedTime()
  mesh.rotation.y = time * 0.04;
  
  renderer.render(scene, camera)
  controls.update()
}

animate();


window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}, false)