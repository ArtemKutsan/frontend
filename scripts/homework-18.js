import { fetchAsText } from './fetch-as-text.js';
import { highlightPreBlocks } from './shiki-pre.js';

/* ===== START ===== */
// Homework 18
/* ===== END ===== */

const resourceUrl1 = `./styles/variables/_colors.scss`;
const resourceUrl2 = `./styles/sections/_header.scss`;
const resourceUrl3 = `./styles/homework-18.scss`;
const resourceUrl4 = `./homework-18.html`;

// fetchAsText(resourceUrl).then((data) => console.log(`// js ${data}`));
fetchAsText(resourceUrl1, resourceUrl2, resourceUrl3).then(async (results) => {
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
