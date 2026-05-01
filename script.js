/* ── Scroll-reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) =>
  revealObserver.observe(el)
);

/* ── Active nav on scroll ── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("site-header");

const headerHeight = header ? header.offsetHeight : 0;

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((l) =>
          l.classList.remove("nav__link--active")
        );

        const active = document.querySelector(
          `.nav__link[href="#${e.target.id}"]`
        );

        if (active) active.classList.add("nav__link--active");
      }
    });
  },
  { rootMargin: `-${headerHeight}px 0px -60% 0px`, threshold: 0 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ── Sticky header shadow ── */
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
});

/* ── Contact form ── */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fb = document.getElementById("contactFeedback");

    if (fb) {
      fb.className =
        "contact__feedback contact__feedback--success";
    }

    this.reset();

    setTimeout(() => {
      if (fb) {
        fb.textContent = "";
        fb.className = "contact__feedback";
      }
    }, 5000);
  });
}

/* ── Video toggle (YouTube-style) ── */
function toggleVideo(wrapper) {
  const video = wrapper.querySelector("video");

  if (video.paused) {
    video.play();
    wrapper.classList.add("playing");
    wrapper.classList.remove("paused");
  } else {
    video.pause();
    wrapper.classList.add("paused");
    wrapper.classList.remove("playing");
  }

}