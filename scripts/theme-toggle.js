// scripts/theme-toggle.js
import { highlightPreBlocks } from "./shiki-pre.js";

/******************************************************************************/
/* 1. Переключение темы. */
const html = document.querySelector("html");
const themeToggleBtn = document.querySelector("#theme-toggle");

// Инициализация иконки темы
themeToggleBtn.innerHTML =
  localStorage.getItem("theme") === "dark"
    ? `<i class="bi bi-moon-fill text-lg"></i>`
    : `<i class="bi bi-sun-fill text-lg"></i>`;

// Переключение темы по клику
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const theme = currentTheme === "dark" ? "light" : "dark";

  // Обновление/переключение темы
  html.setAttribute("data-theme", theme);

  // Обновление/переключение иконки
  themeToggleBtn.innerHTML =
    theme === "dark"
      ? `<i class="bi bi-moon-fill"></i>`
      : `<i class="bi bi-sun-fill"></i>`;

  // Сохранение значения темы в localStorage
  localStorage.setItem("theme", theme);

  highlightPreBlocks(theme === "dark" ? "rose-pine-moon" : "rose-pine-dawn");
});
/******************************************************************************/
