const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const blobs = document.querySelectorAll(".blob");

function applyTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark", isDark);
  themeLabel.textContent = isDark ? "Light" : "Dark";
  const icon = themeToggle.querySelector(".toggle-icon");
  if (icon) {
    icon.textContent = isDark ? "☀️" : "🌙";
  }
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

const storedTheme = localStorage.getItem("theme");
applyTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light");

themeToggle.addEventListener("click", () => {
  applyTheme(body.classList.contains("dark") ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const sectionId = entry.target.getAttribute("id");
      navLinkItems.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  { threshold: 0.55 }
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 14;
  const y = (event.clientY / window.innerHeight - 0.5) * 14;

  blobs.forEach((blob, index) => {
    const factor = (index + 1) * 0.6;
    blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
