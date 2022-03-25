// Define variables

// const navbar = document.querySelector(".navbar__list");
const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// Build dynamic navbar

for (const section of sections) {
  const navbarItem = document.createElement("li");
  const navbarLink = document.createElement("a");
  navbarLink.innerText = section.getAttribute("data-nav");
  navbarItem.setAttribute("class", "navbar__item");
  navbarLink.setAttribute("class", "navbar__link");
  navbarItem.appendChild(navbarLink);
  navbar.appendChild(navbarItem);
}
