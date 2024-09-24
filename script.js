let scence = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 4;
scence.add(camera);

let box = new THREE.IcosahedronGeometry(1, 6);
let dotBox = new THREE.BoxGeometry(1, 1, 1);
let dotMaterial = new THREE.MeshBasicMaterial({color: 'black'});
let material = new THREE.MeshStandardMaterial({color: 'yellow', flatShading: true});
let wireMaterial = new THREE.MeshBasicMaterial({color: 'red', wireframe: true});

let mesh = new THREE.Mesh(box, material)
scence.add(mesh);

let wireMesh = new THREE.Mesh(box, wireMaterial);
wireMesh.position.y = 0.05;
mesh.add(wireMesh);

let dotMesh = new THREE.Mesh(dotBox, dotMaterial);
dotMesh.position.y = 0.05;
mesh.add(dotMesh);

let hemilight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9);
scence.add(hemilight);

const canvas = document.querySelector("#my-canvas");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scence, camera);

let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scence, camera);
    
    let time = clock.getElapsedTime();

    mesh.rotation.y = time;
    mesh.rotation.z = time;
}

animate();