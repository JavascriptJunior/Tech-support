document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeSidebar = document.getElementById("closeSidebar");

  function closeMenu() {
    sidebar.classList.remove("active");
    document.body.classList.remove("sidebar-open");
    overlay.style.display = "none";
    hamburgerIcon.textContent = "☰";
  }

  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    const isOpen = sidebar.classList.contains("active");
    document.body.classList.toggle("sidebar-open", isOpen);
    overlay.style.display = isOpen ? "block" : "none";
    hamburgerIcon.textContent = isOpen ? "✖" : "☰";
  });

  overlay.addEventListener("click", closeMenu);
  closeSidebar.addEventListener("click", closeMenu);
});