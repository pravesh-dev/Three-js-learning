// let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// scene.add(camera);

// let box = new THREE.BoxGeometry(1, 1, 1);
// let material = new THREE.MeshBasicMaterial({ color: 'teal' });
// let mesh = new THREE.Mesh(box, material);

// mesh.position.x = 1

// scene.add(mesh);


// const canvas = document.querySelector("#my-canvas");
// const renderer = new THREE.WebGLRenderer({ canvas , antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.render(scene, camera);

// let clock = new THREE.Clock();

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);

//     let time = clock.getElapsedTime();

//     mesh.rotation.y = time;
//     mesh.rotation.z = time;
// }

// animate();

let scence = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 4;
scence.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({color: 'teal'});

let mesh = new THREE.Mesh(box, material)

scence.add(mesh);

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