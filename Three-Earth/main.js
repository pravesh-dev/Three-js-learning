import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import getStarField from './getStarField.js';
import {getFresnelMat} from './getFresenalMet.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;
// scene.add(camera)
let canvas = document.querySelector('.my-canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const textureLoader = new THREE.TextureLoader();
let geometry = new THREE.IcosahedronGeometry(1.8, 20)
let material = new THREE.MeshStandardMaterial({ map: textureLoader.load('/earth.jpg'), specularMap: textureLoader.load("/02_earthspec1k.jpg"),
  bumpMap: textureLoader.load("/01_earthbump1k.jpg"),
  bumpScale: 0.04, })
// let material = new THREE.MeshStandardMaterial({ map: textureLoader.load('/some.jpg') })

let earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh);

let lightMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('/earthNight.jpg'), blending: THREE.AdditiveBlending })
let lightMesh = new THREE.Mesh(geometry, lightMaterial);
earthGroup.add(lightMesh);

let cloudMaterial = new THREE.MeshStandardMaterial({ map: textureLoader.load('/cloud.jpg'), blending: THREE.AdditiveBlending, alphaMap: textureLoader.load('/05_earthcloudmaptrans.jpg'),})
let cloudMesh = new THREE.Mesh(geometry, cloudMaterial);
cloudMesh.scale.setScalar(1.006)
earthGroup.add(cloudMesh);

let fresnelMaterial = getFresnelMat();
let glowMesh = new THREE.Mesh(geometry, fresnelMaterial);
glowMesh.scale.setScalar(1.02)
earthGroup.add(glowMesh);

let stars = getStarField({numStars: 3000});
scene.add(stars)

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight)


let clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  
  let time = clock.getElapsedTime()
  earthMesh.rotation.y = time * 0.04;
  lightMesh.rotation.y = time * 0.04;
  cloudMesh.rotation.y = time * 0.1;
  stars.rotation.y = -(time * 0.01);
  
  renderer.render(scene, camera)
  controls.update()
}

animate();


window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}, false)