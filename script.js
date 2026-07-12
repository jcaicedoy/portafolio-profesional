const currentYear = document.getElementById("currentYear");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const progressBar = document.getElementById("progressBar");
const revealElements = document.querySelectorAll(".reveal");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  backToTop.classList.toggle("show", scrollTop > 500);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));
