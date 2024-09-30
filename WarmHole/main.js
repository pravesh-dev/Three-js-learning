import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import spline from "./spline.js";

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

let tubegeo = new THREE.TubeGeometry(spline, 222, 1, 20, true);
let material = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});

let tube = new THREE.Mesh(tubegeo, material);
scene.add(tube);

let hemiLight = new THREE.HemisphereLight(0x274156, 0x1C6E8C, 0.9);
scene.add(hemiLight);

const edges = new THREE.EdgesGeometry(tubegeo);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff});
const tubeline = new THREE.LineSegments(edges, lineMaterial);
scene.add(tubeline);

function updateCamera(t) {
  const time = t * 0.03;
  const looptime = 10 * 1000;
  const p = (time % looptime) / looptime;
  const pos = tubegeo.parameters.path.getPointAt(p);
  const lookAt = tubegeo.parameters.path.getPointAt((p + 0.01) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

function animate(t = 0) {
  requestAnimationFrame(animate);
  updateCamera(t);
  renderer.render(scene, camera);
  controls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
