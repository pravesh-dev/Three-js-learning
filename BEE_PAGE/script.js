import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 20;

const scene = new THREE.Scene();
let bee;
let mixer;

const loader = new GLTFLoader();
loader.load('./model/bee_bot.glb',
    function(gltf) {
        bee = gltf.scene;
        bee.position.x = 2.2
        bee.position.y = -1.2
        bee.position.z = -1
        bee.rotation.y = -1
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
    },
    function(xhr) {},
    function(err) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-1, 2, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const reRender3D = () =>{
    requestAnimationFrame(reRender3D);
    mixer.update(0.02);
    renderer.render(scene, camera);
};

reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0.5, y: -1.4, z: 0},
        rotation: {x: 0, y: 1, z: 0},
    },
    {
        id: 'intro',
        position: {x: 2.4, y: -0.8, z: -5},
        rotation: {x: 0, y: -1, z: 0},
    },
    {
        id: 'description',
        position: {x: 2.2, y: 0.2, z: -5},
        rotation: {x: 0, y: 1, z: 0},
    },
    {
        id: 'contact',
        position: {x: 2.2, y: -1.2, z: -1},
        rotation: {x: 0, y: -1, z: 0},
    },
]

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});