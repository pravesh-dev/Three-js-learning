import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// const geometry = new THREE.SphereGeometry(2, 32, 16, 1, Math.PI * 2, 0, Math.PI * 4);
const geometry = new THREE.IcosahedronGeometry(1, 2);
const material = new THREE.MeshStandardMaterial({flatShading: true, color: '0xffffff'});
const wireMaterial = new THREE.MeshBasicMaterial({color: '0xffffff', wireframe: true, antialias: true});
const cube = new THREE.Mesh(geometry, material);
const wireMesh = new THREE.Mesh(geometry, wireMaterial);
scene.add(cube);
cube.add(wireMesh);

let hemilight = new THREE.HemisphereLight('salmon', 'cyan', 0.9);
const helper = new THREE.HemisphereLightHelper( hemilight, 3 );
scene.add(helper);
scene.add(hemilight);

// const light = new THREE.DirectionalLight( 'red', 1 );
// light.position.set( 2, 2, 0 );
// scene.add( light );

// const helper = new THREE.DirectionalLightHelper( light, 2 );
// scene.add( helper );

// const pointLight = new THREE.PointLight('salmon', 1, 100)
// pointLight.position.set(0, 0, 0)
// scene.add(pointLight)

// const helper = new THREE.PointLightHelper(pointLight, 2)
// scene.add(helper)


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

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();
