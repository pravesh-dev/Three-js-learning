import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Texture loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/IMAGES/2.jpg');

const boxGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const material = new THREE.MeshStandardMaterial({
  flatShading: true,
  map: texture,
  metalness: 0.8,
  roughness: 0.3
});
const cube = new THREE.Mesh(boxGeo, material);
scene.add(cube);


// Function to add text to the cube
function addTextToCube(text) {
  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.35,
      depth: 0.1,
      curveSegments: 4,
      bevelEnabled: false,
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0x2f7463 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    // textMesh.position.set(-1.2, 1.2, 1.3);
    textMesh.position.set(-1.2, 0.85, 1.3);
    cube.add(textMesh);

    // Create shadow text
    const shadowGeometry = new TextGeometry(text, {
      font: font,
      size: 0.35,
      depth: 0.1,
      curveSegments: 4,
      bevelEnabled: false,
    });
    const shadowMaterial = new THREE.MeshPhongMaterial({ color: 0x2f7463, opacity: 0.4, transparent: true });
    const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadowMesh.position.set(-1.18, 1.2, 1.2);
    shadowMesh.rotation.x = -1;
    // cube.add(shadowMesh);
  });
}

// Call function to add text
// addTextToCube('Metal Cube');
addTextToCube('Ritik Saini');


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

// Add hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0x2f7463, 0xffffff, 0.9);
// Set light position
hemisphereLight.position.set(1.4, 1.3, 0.2);
scene.add(hemisphereLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(-0.3,0.5,3);
scene.add(pointLight);

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
