import { fetchAsText } from './fetch-as-text.js';
import { highlightPreBlocks } from './shiki-pre.js';

/* ===== START ===== */
// Homework 17
/* ===== END ===== */

const resourceUrl1 = `./styles/homework-17.scss`;

// fetchAsText(resourceUrl).then((data) => console.log(`// js ${data}`));
fetchAsText(resourceUrl1).then(async (results) => {
  const codeBlock = document.querySelector('#code-block');
  if (!codeBlock) return;

  for (let data of results) {
    const pre = document.createElement('pre');

    const match = data.match(
      /(\/\*\s*===== START =====\s*\*\/|<!--\s*===== START =====\s*-->)([\s\S]*?)(\/\*\s*===== END =====\s*\*\/|<!--\s*===== END =====\s*-->)/
    );

    if (match) data = match[2].trim();

    data = data.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = data;
    pre.classList.add('language-scss');
    codeBlock.appendChild(pre);
  }

  await highlightPreBlocks(codeBlock);
});
