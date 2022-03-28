import * as THREE from "../vendor/three/build/three.module.js";

// Create spinning globe

const init = () => {
  const canvas = document.querySelector("#canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 25;

  const scene = new THREE.Scene();

  {
    const light = new THREE.DirectionalLight(0xffffff, 1); // color & intensity
    light.position.set(100, 50, 100);
    scene.add(light);
  }

  const geometry = new THREE.SphereGeometry(10, 100, 100);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  material.map = THREE.ImageUtils.loadTexture("images/world-map1.jpg");

  const sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.x += 0.2;
  scene.add(sphere);

  const render = () => {
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

init();

// Define variables

const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// Smooth scrolling

const scroll = (link, section) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
};

// Build dynamic navbar

for (const section of sections) {
  const navbarItem = document.createElement("li");
  const navbarLink = document.createElement("a");
  navbarLink.innerText = section.getAttribute("data-nav");
  navbarItem.setAttribute("class", "navbar__item");
  navbarLink.setAttribute("class", "navbar__link");
  navbarLink.setAttribute("href", `#${section.id}`);
  navbarItem.classList.add(`${section.id}`);
  navbarItem.appendChild(navbarLink);
  navbar.appendChild(navbarItem);
  scroll(navbarLink, section);
}

// Add active class

window.addEventListener("scroll", () => addActiveClass());

const addActiveClass = () => {
  let scrollY = window.pageYOffset;
  for (const section of sections) {
    const link = document.querySelector(`li.${section.id}`);
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      section.classList.add("active");
      link.classList.add("active");
    } else {
      section.classList.remove("active");
      link.classList.remove("active");
    }
  }
};
