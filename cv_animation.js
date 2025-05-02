// console load
console.log("CV loaded");

// Efek animasi one by one
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section, i) => {
    section.classList.add("animate-in");
    setTimeout(() => {
      section.classList.add("animate-show");
    }, 300 * (i + 1));
  });
});