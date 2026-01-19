// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Optional: close the gap in anchor scrolling because of fixed header
// This gently offsets the scroll position.
const header = document.querySelector(".site-header");
const headerHeight = () => header.getBoundingClientRect().height;

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const targetId = a.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const y =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight();

    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));


navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    const targetId = a.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const y =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight();

    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

// Scroll-spy: highlight nav based on section in view
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    // Find the entry that's most "in view"
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) {
      setActiveLink(visible.target.id);
    }
  },
  {
    root: null,
    // Push the "active" point down a bit to account for fixed header
    rootMargin: `-${Math.round(headerHeight())}px 0px -55% 0px`,
    threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
  }
);

sections.forEach((section) => observer.observe(section));

// Ensure correct active link on load (e.g., refreshing mid-page)
window.addEventListener("load", () => {
  const fromHash = location.hash?.replace("#", "");
  if (fromHash) setActiveLink(fromHash);
});
