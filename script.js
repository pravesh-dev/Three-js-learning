import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 4;
scene.add(camera);

let box = new THREE.IcosahedronGeometry(1, 1);
let material = new THREE.MeshStandardMaterial({flatShading: true});
let wireMaterial = new THREE.MeshBasicMaterial({color: '0xffffff', wireframe: true, antialias: true});

let mesh = new THREE.Mesh(box, material)
scene.add(mesh);

let wireMesh = new THREE.Mesh(box, wireMaterial);
mesh.add(wireMesh);

let hemilight = new THREE.HemisphereLight(0x5522, 0xfc0404, 0.9);
scene.add(hemilight);

const canvas = document.querySelector("#my-canvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderer.render(scene, camera);

let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    controls.update();
    
    let time = clock.getElapsedTime();

    mesh.rotation.y = time;
    mesh.rotation.z = time;
    
    renderer.render(scene, camera);
}

animate();