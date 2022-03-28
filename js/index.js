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
