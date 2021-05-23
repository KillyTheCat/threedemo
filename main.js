import './style.css'

import * as THREE from 'three';
import { RingBufferGeometry } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(70);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const geometry2 = new THREE.SphereGeometry(15);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347,
});

const material2 = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);
const ring = new THREE.Mesh(geometry2, material2);

scene.add(torus, ring);

const pointLight = new THREE.PointLight(0xffffff);
const pointLight2 = new THREE.PointLight(0x2de2e6);
const ambientLight = new THREE.AmbientLight(0xff6c11, 0.1);

pointLight.position.set(20, 20, 20);
pointLight2.position.set(-20, -20, -10);
scene.add(pointLight, pointLight2, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTex = new THREE.Color(0x000000);
scene.background = spaceTex;

const trollTex = new THREE.TextureLoader().load('images/Trollface_non-free.png');

const troll = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshBasicMaterial({ map: trollTex, transparent: true })
);

scene.add(troll);

const moonTex = new THREE.TextureLoader().load('images/doge.png');
const moonNormal = new THREE.TextureLoader().load('images/normalmap.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 8, 8),
    new THREE.MeshStandardMaterial({ map: moonTex, transparent: true })
);

moon.position.z = 30;
moon.position.x = 5;

scene.add(moon);
const moonLight = new THREE.PointLight(0x5c2c6d);
moonLight.position.z = 30;
moonLight.position.x = 7;
scene.add(moonLight);

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.008;
    torus.rotation.y += 0.020;
    torus.rotation.z += 0.002;

    ring.rotation.y += 0.005;
    ring.rotation.z += 0.004;
    ring.rotation.x += 0.008;

    controls.update();
    renderer.render(scene, camera);
}

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    troll.rotation.x += 0.01;
    troll.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t + -0.0002;

    console.log(camera.position.x, camera.position.y, camera.position.z);

}

document.body.onscroll = moveCamera

animate();