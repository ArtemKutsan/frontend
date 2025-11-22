import { highlightPreBlocks } from "/scripts/shiki-pre.js";

const theme = document
  .querySelector("html")
  .setAttribute("data-theme", localStorage.getItem("theme") || "light");

const shikiTheme = theme === "dark" ? "rose-pine-moon" : "rose-pine-dawn";

document.addEventListener("DOMContentLoaded", () => {
  highlightPreBlocks(shikiTheme);
});
