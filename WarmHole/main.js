import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import spline from "./spline.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000019, 0.3);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

let canvas = document.querySelector(".my-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(w, h);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const renderScene = new RenderPass(scene, camera)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100)
bloomPass.threshold = 0.5;
bloomPass.strength = 0.1;
bloomPass.radius = 0.007;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

let tubegeo = new THREE.TubeGeometry(spline, 500, 0.7, 20, true);
let tubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
let tube = new THREE.Mesh(tubegeo, tubeMaterial);
// scene.add(tube);

const edges = new THREE.EdgesGeometry(tubegeo, 0.2);
const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

let hemiLight = new THREE.HemisphereLight(0x274156, 0x1C6E8C, 0.9);
scene.add(hemiLight);

const shapes = 80;
const size = 0.075;
const boxGeo = new THREE.BoxGeometry(size, size, size);
const sphereGeo = new THREE.SphereGeometry(size / 2, 8, 8);
const cylinderGeo = new THREE.CylinderGeometry(size / 2, size / 2, size, 8);
const rectangleGeo = new THREE.BoxGeometry(size * 1.5, size * 0.75, size * 0.5);
const tubeGeo = new THREE.TorusGeometry(size / 2, size / 4, 8, 16);

const shapesArray = [];

for (let i = 0; i < shapes; i++) {
  let geometry;
  switch (i % 5) {
    case 0: geometry = boxGeo; break;
    case 1: geometry = sphereGeo; break;
    case 2: geometry = cylinderGeo; break;
    case 3: geometry = rectangleGeo; break;
    case 4: geometry = tubeGeo; break;
  }

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const shape = new THREE.Mesh(geometry, material);
  const p = (i / shapes + Math.random() * 0.1) % 1;
  const pos = tubegeo.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.02;
  pos.z += Math.random() - 0.02;
  shape.position.copy(pos);

  const rotation = new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  shape.rotation.set(rotation.x, rotation.y, rotation.z);

  const edges = new THREE.EdgesGeometry(geometry);
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  // const color = new THREE.Color().setHSL(1.0 -p, 1, 0.5);
  const lineMat = new THREE.LineBasicMaterial({ color });
  const shapeLines = new THREE.LineSegments(edges, lineMat);
  shapeLines.position.copy(pos);
  shapeLines.rotation.set(rotation.x, rotation.y, rotation.z);
  scene.add(shapeLines);
  
  shapesArray.push(shapeLines);
}

const clock = new THREE.Clock();

function updateCamera(t) {
  const time = t * 0.1;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubegeo.parameters.path.getPointAt(p);
  const lookAt = tubegeo.parameters.path.getPointAt((p + 0.01) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);

  // Rotate shapes
  let clockTime = clock.getElapsedTime();
  shapesArray.forEach((shape, index) => {
    shape.rotation.x = clockTime * 0.3
    shape.rotation.y = clockTime * 0.3
    shape.rotation.z = clockTime * 0.3
  });
}

function animate(t = 0) {
  requestAnimationFrame(animate);
  updateCamera(t);
  composer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
