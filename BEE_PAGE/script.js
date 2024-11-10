import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

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
        scene.add(bee);
        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        moveModel()
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
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
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
        position: {x: -2.2, y: 0.2, z: -5},
        rotation: {x: 0, y: 1, z: 0},
    },
    {
        id: 'contact',
        position: {x: 2.2, y: -1.2, z: -1},
        rotation: {x: 0, y: -1, z: 0},
    },
]

const moveModel = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section)=>{
        const rect = section.getBoundingClientRect();
        if(rect.top <= window.innerHeight / 2) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex((val)=> val.id == currentSection);
    
    if(position_active >= 0) {
        let new_corrdinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_corrdinates.position.x,
            y: new_corrdinates.position.y,
            z: new_corrdinates.position.z,
            duration: 2,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_corrdinates.rotation.x,
            y: new_corrdinates.rotation.y,
            z: new_corrdinates.rotation.z,
            duration: 2,
            ease: "power1.out"
        });
    }
};

window.addEventListener('scroll', () =>{
    if(bee){
        moveModel();
    } 
})

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});