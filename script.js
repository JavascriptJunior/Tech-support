let fixes = [];

function loadFixes() {
  fetch('fixes.json')
    .then(res => res.json())
    .then(data => {
      fixes = data;
      renderFixes(fixes);
      initSearch();
    });
}

function renderFixes(list) {
  const container = document.getElementById("fixContainer");
  const noResults = document.getElementById("noResults");
  container.innerHTML = "";
  noResults.style.display = list.length ? "none" : "block";

  list.forEach(fix => {
    const wrapper = document.createElement("div");
    const title = document.createElement("button");
    const content = document.createElement("div");

    title.className = "fix-title";
    title.textContent = fix.title;

    content.className = "fix-steps";
    content.style.display = "none";

    fix.steps.forEach(step => {
      const p = document.createElement("p");
      p.textContent = step;
      content.appendChild(p);
    });

    title.onclick = () => {
      content.style.display = content.style.display === "none" ? "block" : "none";
    };

    wrapper.appendChild(title);
    wrapper.appendChild(content);
    container.appendChild(wrapper);
  });
}

function initSearch() {
  const searchInput = document.getElementById("fixSearch");
  const categoryFilter = document.getElementById("categoryFilter");

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const results = fixes.filter(fix => {
      const matchesTitle = fix.title.toLowerCase().includes(term);
      const matchesCategory = category === "All" || fix.category === category;
      return matchesTitle && matchesCategory;
    });

    renderFixes(results);
  });

  categoryFilter.addEventListener("change", () => {
    const term = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const results = fixes.filter(fix => {
      const matchesTitle = fix.title.toLowerCase().includes(term);
      const matchesCategory = category === "All" || fix.category === category;
      return matchesTitle && matchesCategory;
    });

    renderFixes(results);
  });
}

// Load fixes when page loads
window.onload = loadFixes;
// Sidebar toggle logic
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  document.body.classList.toggle("sidebar-open");
});

// Auto-close sidebar on nav link click (mobile only)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
      document.body.classList.remove("sidebar-open");
    }
  });
});
function initCategoryFiltering() {
  document.querySelectorAll(".category-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      const filtered = category === "All"
        ? fixes
        : fixes.filter(fix => fix.category === category);
      renderFixes(filtered);

      // Optional: Close sidebar on mobile
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("active");
        document.body.classList.remove("sidebar-open");
      }
    });
  });
}

window.onload = () => {
  loadFixes();
  initCategoryFiltering();
};
