document.addEventListener("DOMContentLoaded", () => {

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

  const header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === currentPage) {
      link.classList.add("nav__link--active");
    }
  });

  const hamburger = document.getElementById("navHamburger");
  const navLinks  = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("nav__links--open");
      hamburger.classList.toggle("nav__hamburger--open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav")) closeMenu();
    });
  }

  const skillBars = document.querySelectorAll(".skill-bar__fill");
  if (skillBars.length) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const pct = e.target.dataset.pct || "0";
            e.target.style.width = pct + "%";
            barObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    skillBars.forEach((b) => barObserver.observe(b));
  }

  const roleWrap = document.querySelector(".hero__role-wrap");
  if (roleWrap) {
    const items = roleWrap.querySelectorAll(".hero__role-item");
    let idx = 0;
    if (items.length) {
      items[0].classList.add("active");
      setInterval(() => {
        items[idx].classList.remove("active");
        idx = (idx + 1) % items.length;
        items[idx].classList.add("active");
      }, 2200);
    }
  }

  const textEl = document.querySelector(".typing-text");
  if (textEl) {
    const full = textEl.innerText.trim();
    let i = 0;
    textEl.innerText = "";

    function typeLoop() {
      textEl.innerText = full.slice(0, i++);
      if (i > full.length) {
        setTimeout(() => { i = 0; setTimeout(typeLoop, 500); }, 1800);
      } else {
        setTimeout(typeLoop, 35);
      }
    }

    const typingObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { typeLoop(); typingObs.disconnect(); }
    }, { threshold: 0.4 });
    typingObs.observe(textEl);
  }

  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");

    if (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("http") &&
      !href.startsWith("mailto") &&
      !href.startsWith("tel")
    ) {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.style.transition = "opacity 0.28s ease";
        document.body.style.opacity = "0";
        setTimeout(() => { location.href = href; }, 290);
      });
    }
  });

});


function closeMenu() {
  const hamburger = document.getElementById("navHamburger");
  const navLinks  = document.getElementById("navLinks");
  if (!navLinks) return;
  navLinks.classList.remove("nav__links--open");
  if (hamburger) {
    hamburger.classList.remove("nav__hamburger--open");
    hamburger.setAttribute("aria-expanded", "false");
  }
}