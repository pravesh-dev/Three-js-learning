import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

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

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const hemisphereLight = new THREE.HemisphereLight(0x4b0082, 0xffa500, 0.9);
hemisphereLight.position.set(1.4, 1.3, 0.2);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0x00ff00, 0.8);
pointLight.position.set(-0.3,0.5,3);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
