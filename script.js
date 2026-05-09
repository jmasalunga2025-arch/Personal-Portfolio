/* SCROLL REVEAL */
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

/* ACTIVE NAV LINK ON SCROLL */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("site-header");
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

/* STICKY HEADER SHADOW */
window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
}, { passive: true });

/* CONTACT FORM */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fb = document.getElementById("contactFeedback");

    if (fb) {
      fb.textContent = "Message sent!";
      fb.className = "contact__feedback contact__feedback--success";
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

/* VIDEO TOGGLE */
function toggleVideo(wrapper) {
  const video = wrapper.querySelector("video");
  const isPlaying = !video.paused;

  if (isPlaying) {
    video.pause();
    wrapper.classList.remove("playing");
    wrapper.classList.add("paused");
  } else {
    document.querySelectorAll(".video-wrapper.playing").forEach((other) => {
      if (other !== wrapper) {
        other.querySelector("video").pause();
        other.classList.remove("playing");
        other.classList.add("paused");
      }
    });

    video.play().catch(() => {
      wrapper.classList.remove("playing");
      wrapper.classList.add("paused");
    });

    wrapper.classList.add("playing");
    wrapper.classList.remove("paused");
  }
}

/* VIDEO END RESET */
document.querySelectorAll(".video-wrapper video").forEach((vid) => {
  vid.addEventListener("ended", () => {
    const wrapper = vid.closest(".video-wrapper");
    if (wrapper) {
      wrapper.classList.remove("playing");
      wrapper.classList.add("paused");
    }
  });
});