import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';  // Import FontLoader
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

// const geometry = new THREE.SphereGeometry(2, 32, 16, 1, Math.PI * 2, 0, Math.PI * 4);
const geometry = new THREE.IcosahedronGeometry(2.4, 2);
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
  // Load font
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
    // textMesh.position.set(-1.2, 1.2, 1.3); // Adjust position relative to cube
    textMesh.position.set(-1.2, 0.85, 1.3); // Adjust position relative to cube
    cube.add(textMesh); // Add text as a child of the cube

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
    shadowMesh.position.set(-1.18, 1.2, 1.2); // Slightly offset from the main text and on the back
    shadowMesh.rotation.x = -1; // Rotate to face the back
    // cube.add(shadowMesh);
  });
}

// Call function to add text
addTextToCube('Metal Cube');


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


// Add hemisphere light helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 3);
// scene.add(hemisphereLightHelper);

// Add hemisphere light controls to GUI
const lightFolder = gui.addFolder('Hemisphere Light');
lightFolder.add(hemisphereLight, 'intensity', 0, 1).name('Intensity');
lightFolder.addColor(hemisphereLight.color, 'r', 0, 1).name('Sky Color R');
lightFolder.addColor(hemisphereLight.color, 'g', 0, 1).name('Sky Color G');
lightFolder.addColor(hemisphereLight.color, 'b', 0, 1).name('Sky Color B');
lightFolder.addColor(hemisphereLight.groundColor, 'r', 0, 1).name('Ground Color R');
lightFolder.addColor(hemisphereLight.groundColor, 'g', 0, 1).name('Ground Color G');
lightFolder.addColor(hemisphereLight.groundColor, 'b', 0, 1).name('Ground Color B');

// Add helper visibility control to GUI
lightFolder.add(hemisphereLightHelper, 'visible').name('Show Helper');

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(-0.3,0.5,3);
scene.add(pointLight);

// Add point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.6);
// scene.add(pointLightHelper);

// Add point light controls to GUI
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 2).name('Intensity');
pointLightFolder.add(pointLight.position, 'x', -5, 5).name('Position X');
pointLightFolder.add(pointLight.position, 'y', -5, 5).name('Position Y');
pointLightFolder.add(pointLight.position, 'z', -5, 5).name('Position Z');
pointLightFolder.addColor(pointLight, 'color').name('Color');
pointLightFolder.add(pointLightHelper, 'visible').name('Show Helper');

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
