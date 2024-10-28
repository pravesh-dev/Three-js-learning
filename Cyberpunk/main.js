import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

let canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let helmetModel;
const loader = new GLTFLoader();

// Load HDRI first, then load the 3D model
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/brown_photostudio_02_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
    
    // Load the 3D model after HDRI is loaded
    loader.load(
        '/DamagedHelmet.gltf',
        function (gltf) {
            helmetModel = gltf.scene;
            helmetModel.scale.set(6, 6, 6);
            scene.add(helmetModel);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
});

function animate() {
    requestAnimationFrame(animate);    
    controls.update();
    renderer.render(scene, camera);
}

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);