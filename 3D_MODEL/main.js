import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Add horizontal hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xfc0404, 0xffffff, 1);
hemisphereLight.position.set(3, 1, 0); // Set the light's position to be horizontal
scene.add(hemisphereLight);

// Add hemisphere light helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.5);
scene.add(hemisphereLightHelper);

let carModel;

const loader = new GLTFLoader();
loader.load('2022__hyundai_n_vision_74__thx_1.9k.glb', (gltf) => {
  carModel = gltf.scene;
  scene.add(carModel);
  
  // Adjust the model's position and scale if needed
  carModel.position.set(0, 0, 0);
  carModel.scale.set(1, 1, 1);
}, undefined, (error) => {
  console.error('An error occurred while loading the model:', error);
});

camera.position.z = 5;

let canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update OrbitControls in the animation loop
  renderer.render(scene, camera);
}
animate();
