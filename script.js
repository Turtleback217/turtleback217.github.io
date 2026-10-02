(() => {
  "use strict";
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-set-design]"));
  const palette = document.getElementById("palette");
  const status = document.getElementById("appearance-status");
  const key = "simon-portfolio-appearance-v2";
  const designs = ["origami", "jardin"];
  const palettes = ["burgundy", "ocean"];

  function apply(design, color, announce = false) {
    root.dataset.design = designs.includes(design) ? design : "jardin";
    root.dataset.palette = palettes.includes(color) ? color : "ocean";
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.setDesign === root.dataset.design)));
    palette.value = root.dataset.palette;
    if (announce) status.textContent = `${root.dataset.design === "origami" ? "Origami" : "Jardin"} style, ${palette.selectedOptions[0].textContent} palette. Content unchanged.`;
  }

  function save() {
    try { localStorage.setItem(key, JSON.stringify({ design: root.dataset.design, palette: root.dataset.palette })); }
    catch { /* Appearance remains usable when browser storage is unavailable. */ }
  }

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (saved && typeof saved === "object") apply(saved.design, saved.palette);
  } catch { /* Keep the readable HTML defaults for blocked or invalid storage. */ }

  buttons.forEach(button => button.addEventListener("click", () => {
    apply(button.dataset.setDesign, palette.value, true);
    save();
  }));
  palette.addEventListener("change", () => {
    apply(root.dataset.design, palette.value, true);
    save();
  });
})();
