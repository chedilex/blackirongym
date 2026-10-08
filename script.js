/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }, 1200);
});

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
const counters = document.querySelectorAll(".counter");
const counterSpeed = 60;
let counterStarted = false;

function startCounter() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach((counter) => {
    const target = +counter.dataset.target || 0;
    const increment = Math.ceil(target / counterSpeed);

    const update = () => {
      const value = +counter.innerText.replace("+", "") || 0;
      if (value < target) {
        counter.innerText = Math.min(value + increment, target);
        setTimeout(update, 20);
      } else {
        counter.innerText = target + "+";
      }
    };
    update();
  });
}

const statsSection = document.querySelector(".stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter();
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 },
  );
  statsObserver.observe(statsSection);
}

/* ============================================================
   BMI CALCULATOR
   ============================================================ */
function calculateBMI() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const resultEl = document.getElementById("bmi-result");

  if (!weight || !height || weight <= 0 || height <= 0) {
    resultEl.innerHTML = "Please enter valid weight and height";
    return;
  }

  const h = height / 100;
  const bmi = weight / (h * h);

  let status;
  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 25) status = "Normal Weight";
  else if (bmi < 30) status = "Overweight";
  else status = "High BMI";

  resultEl.innerHTML = "Your BMI: " + bmi.toFixed(1) + "<br>" + status;
}

// Make calculateBMI global (used in HTML onclick)
window.calculateBMI = calculateBMI;

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close");

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = image.src;
    document.body.style.overflow = "hidden";
  });
});

function closeLB() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}

if (closeLightbox) closeLightbox.addEventListener("click", closeLB);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLB();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.style.display === "flex") {
    closeLB();
  }
});

/* ============================================================
   TESTIMONIAL SLIDER
   ============================================================ */
const testimonials = document.querySelectorAll(".testimonial");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
let currentTestimonial = 0;
let testimonialInterval = null;

function showTestimonial(index) {
  testimonials.forEach((item) => item.classList.remove("active"));
  if (testimonials[index]) testimonials[index].classList.add("active");
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextTestimonial();
    resetTestimonialInterval();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevTestimonial();
    resetTestimonialInterval();
  });
}

function startTestimonialInterval() {
  if (testimonials.length > 1) {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }
}

function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  startTestimonialInterval();
}

if (testimonials.length > 1) {
  startTestimonialInterval();
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = menuBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      navLinks.classList.remove("open");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    }
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener(
    "scroll",
    () => {
      topBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    },
    { passive: true },
  );

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealElements = document.querySelectorAll(
  ".about, .program-card, .trainer-card, .price-card, .bmi-box, .gallery-item, .testimonial, .contact-container, .stat-box",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          setTimeout(() => entry.target.classList.add("show"), 80);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("show"));
}

/* ============================================================
   HANDLE RESIZE — close mobile menu when resizing to desktop
   ============================================================ */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 900 && navLinks) {
      navLinks.classList.remove("open");
      const icon = menuBtn?.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    }
  }, 150);
});

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#" || targetId.length < 2) return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});
