import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const boxGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const material = new THREE.MeshStandardMaterial({
  flatShading: true,
  metalness: 0.8,
  roughness: 0.3
});
const cube = new THREE.Mesh(boxGeo, material);
scene.add(cube);

// Add a sphere
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  flatShading: true,
  metalness: 0.6,
  roughness: 0.4
});
const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
sphere.position.set(3, 0, 0); // Position the sphere next to the cube
scene.add(sphere);

camera.position.z = 5;

let canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const hemisphereLight = new THREE.HemisphereLight(0x2f7463, 0xffffff, 0.9);
hemisphereLight.position.set(1.4, 1.3, 0.2);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(-0.3,0.5,3);
scene.add(pointLight);

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
