const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.10 }
);

document.querySelectorAll(".reveal").forEach((el) =>
  revealObserver.observe(el)
);


const sections    = document.querySelectorAll("section[id]");
const navLinks    = document.querySelectorAll(".nav__link");
const header      = document.getElementById("site-header");
const headerHeight = header ? header.offsetHeight : 64;

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("nav__link--active"));
        const active = document.querySelector(`.nav__link[href="#${e.target.id}"]`);
        if (active) active.classList.add("nav__link--active");
      }
    });
  },
  { rootMargin: `-${headerHeight}px 0px -60% 0px`, threshold: 0 }
);

sections.forEach((s) => sectionObserver.observe(s));

window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });