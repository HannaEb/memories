import * as THREE from "../vendor/three/build/three.module.js";

// Create spinning globe

const init = () => {
  const canvas = document.querySelector("#canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 20;

  const scene = new THREE.Scene();

  {
    const light = new THREE.DirectionalLight(0xffffff, 1); // color & intensity
    light.position.set(100, 50, 100);
    scene.add(light);
  }

  const geometry = new THREE.SphereGeometry(10, 100, 100);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  material.map = THREE.ImageUtils.loadTexture("images/world-map.jpg");

  const sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.x += 0.2;
  scene.add(sphere);

  const resize = (renderer) => {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  };

  const render = () => {
    if (resize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    sphere.rotation.y += 0.004;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

init();
