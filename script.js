// JADA DIGITAL — navigation, contact form and small interactions

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile navigation
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

// Automatically update the footer year
const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Prepare an email from the contact form
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "Not specified").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Website enquiry from ${name}`;
    const body = [
      `Hello Aliyu,`,
      ``,
      `My name is ${name}.`,
      `My email address is ${email}.`,
      `Service needed: ${service || "Not specified"}.`,
      ``,
      `Project details:`,
      message,
      ``,
      `Thank you.`
    ].join("\n");

    const mailto = `mailto:umarjadaaliyu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formNote) {
      formNote.textContent = "Your email application should open with the enquiry prepared. If it does not, email umarjadaaliyu@gmail.com directly.";
    }

    window.location.href = mailto;
  });
}

// Reveal sections gently as they enter the screen
const revealItems = document.querySelectorAll(
  ".hero-content, .hero-visual, .section-heading, .about-intro, .about-details, .service-card, .project-card, .process-item, .cta-card, .contact-content, .contact-form"
);

revealItems.forEach((item) => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Highlight the current section in the navigation
const pageSections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window && pageSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  pageSections.forEach((section) => sectionObserver.observe(section));
}
