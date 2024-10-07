import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// const geometry = new THREE.SphereGeometry(2, 32, 16, 1, Math.PI * 2, 0, Math.PI * 4);
const geometry = new THREE.IcosahedronGeometry(2.4, 2);
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({flatShading: true, color: 0xffffff});
const wireMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, antialias: true});
const cube = new THREE.Mesh(boxGeo, material);
const wireMesh = new THREE.Mesh(boxGeo, wireMaterial);
scene.add(cube);
cube.add(wireMesh);

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

// Add GUI
const gui = new GUI();

// Add cube controls
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
cubeFolder.add(cube.scale, 'x', 0.1, 2).name('Scale X');
cubeFolder.add(cube.scale, 'y', 0.1, 2).name('Scale Y');
cubeFolder.add(cube.scale, 'z', 0.1, 2).name('Scale Z');

// Add material controls
const materialFolder = gui.addFolder('Material');
materialFolder.addColor(material, 'color').name('Color');
materialFolder.add(material, 'flatShading').onChange(() => material.needsUpdate = true);
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'metalness', 0, 1);
materialFolder.add(material, 'roughness', 0, 1);

// Add mesh controls
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube, 'visible');
meshFolder.add(wireMesh, 'visible').name('Wireframe Visible');

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add ambient light controls to GUI
const lightFolder = gui.addFolder('Ambient Light');
lightFolder.add(ambientLight, 'intensity', 0, 1).name('Intensity');
lightFolder.addColor(ambientLight, 'color').name('Color');


function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
