import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let width = document.documentElement.clientWidth,
  height = document.documentElement.clientHeight;

class Canvas {
  constructor() {
    this.container = document.getElementById("canvas");
    this.init();
  }
  init() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 2.3;
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(0, 0, 5);
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.scene.add(new THREE.AxesHelper());
    this.addTorus();
    this.addPointLight();
    this.addHemiLight();
    this.animate();
  }
  addTorus() {
    const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
    const material = new THREE.MeshPhongMaterial({ color: 0xfb6107 });
    this.torusKnot = new THREE.Mesh(geometry, material);
    this.scene.add(this.torusKnot);
  }
  addPointLight() {
    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI, 0.4, 2);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 500;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.1;
    spotLight.position.set(2, 1, 2);
    this.scene.add(spotLight);
  }
  addHemiLight() {
    const light = new THREE.HemisphereLight(0x7b524a, 0x7b524a, 4);
    this.scene.add(light);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.torusKnot.rotation.x += 0.01;
    this.torusKnot.rotation.z += 0.001;
    this.renderer.render(this.scene, this.camera);
  }
}
new Canvas();
