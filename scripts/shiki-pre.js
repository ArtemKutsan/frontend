// scripts/shiki-pre.js
import { codeToHtml } from "https://esm.sh/shiki@3.0.0";

export async function highlightPreBlocks(theme = "rose-pine-dawn") {
  const blocks = document.querySelectorAll("pre");

  for (const pre of blocks) {
    const langClass = [...pre.classList].find((c) => c.startsWith("language-"));
    const lang = langClass ? langClass.replace("language-", "") : "txt";

    const code = pre.textContent.trim();

    const shikiHtml = await codeToHtml(code, { lang, theme });

    // Вставляем новый HTML сразу после старого <pre>
    pre.insertAdjacentHTML("afterend", shikiHtml);

    // Новый <pre> — это следующий элемент
    const newPre = pre.nextElementSibling;
    if (!newPre) continue;

    // Удаляем старый <pre>
    pre.remove();

    // Добавляем language-XXX к Shiki <pre> для повторного использования при мены темы например
    if (langClass) newPre.classList.add(langClass);
  }
}
