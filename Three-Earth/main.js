import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import getStarField from './getStarField.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;
// scene.add(camera)

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const textureLoader = new THREE.TextureLoader();
let geometry = new THREE.IcosahedronGeometry(1.3, 20)
let material = new THREE.MeshStandardMaterial({ map: textureLoader.load('/earth.jpg') })
// let material = new THREE.MeshStandardMaterial({ map: textureLoader.load('/some.jpg') })

let earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh);

let lightMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load('/earthNight.jpg'), blending: THREE.AdditiveBlending })
let lightMesh = new THREE.Mesh(geometry, lightMaterial);
earthGroup.add(lightMesh);

let stars = getStarField({numStars: 3000});
scene.add(stars)

const sunLight = new THREE.DirectionalLight(0xffffff, 0.3);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight)

let canvas = document.querySelector('.my-canvas')
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

let clock = new THREE.Clock()


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  let time = clock.getElapsedTime()
  earthMesh.rotation.y = time * 0.04;

  lightMesh.rotation.y = time * 0.04;

  stars.rotation.y = -(time * 0.01);

  controls.update()
}

animate()