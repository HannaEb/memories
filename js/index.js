// Define variables

const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// Smooth scrolling

// const scroll = (link, section) => {
//   link.addEventListener("click", (event) => {
//     event.preventDefault();
//     section.scrollIntoView({ behavior: "smooth" });
//   });
// };

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

// Lazy loading images

const imageTargets = document.querySelectorAll("img[data-src]");

const loadImage = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-image");
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "-10%",
});

imageTargets.forEach((image) => imageObserver.observe(image));
