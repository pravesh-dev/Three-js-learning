import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

let canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// Post processing setup
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.1,  // strength
    0.3,  // radius
    0.85  // threshold
);
composer.addPass(bloomPass);

const filmPass = new FilmPass(
    0.1,  // noise intensity
    0.025,  // scanline intensity
    648,    // scanline count
    false   // grayscale
);
composer.addPass(filmPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.001;
composer.addPass(rgbShiftPass);

let model;
const loader = new GLTFLoader();

const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/warm_restaurant_night_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture;

    loader.load(
        '/DamagedHelmet.gltf',
        function (gltf) {
            model = gltf.scene;
            model.scale.set(6, 6, 6);
            scene.add(model);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
});

window.addEventListener("mousemove", (e)=>{
    if(model){
        const rotationX = (e.clientX/ window.innerWidth - 0.5) * Math.PI 
        const rotationY = (e.clientY/ window.innerHeight - 0.5) * Math.PI;
        model.rotation.x = rotationY;
        model.rotation.y = rotationX;
    }
})

function animate() {
    requestAnimationFrame(animate);    
    composer.render();
}

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);