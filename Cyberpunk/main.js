import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;

// Create a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Changed to MeshPhongMaterial for lighting
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

// Add hemisphere light helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.5);
scene.add(hemisphereLightHelper);

// Create a clock
const clock = new THREE.Clock();

// Resize function
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Get the elapsed time
    const elapsedTime = clock.getElapsedTime();

    // Update OrbitControls
    controls.update();

    // Add rotation to the cube based on elapsed time
    cube.rotation.x = elapsedTime * 0.5;
    cube.rotation.y = elapsedTime * 0.7;

    renderer.render(scene, camera);
}

animate();
