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

let hemilight = new THREE.HemisphereLight('salmon', 'cyan', 0.9);
const sphereHelper = new THREE.HemisphereLightHelper( hemilight, 3 );
scene.add(hemilight);
// scene.add(sphereHelper);

const light = new THREE.DirectionalLight( 'green', 1 );
light.position.set( 3, 1, 0 );
const directionHelper = new THREE.DirectionalLightHelper( light, 2 );
scene.add( light );
// scene.add( directionHelper );

const pointLight = new THREE.PointLight('salmon', 1, 100);
pointLight.position.set(-1, 1, 0);
const pointHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLight);
// scene.add(pointHelper);

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 1, -2, 2 );
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLight );
scene.add( spotLightHelper );

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

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
