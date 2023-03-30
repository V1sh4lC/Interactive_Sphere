import * as THREE from "three"
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//----scene
const scene = new THREE.Scene();

//----create object
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#0083ff",
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//----light
const light  = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

//----size var
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//----camera
const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);


//----renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablepan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//----resize update
window.addEventListener('resize', () => {
  //----update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //----update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height);
})

// ----loop for mesh distortion update
const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}

loop()