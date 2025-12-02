import { fetchAsText } from './fetch-as-text.js';
import { highlightPreBlocks } from './shiki-pre.js';

/* ===== START ===== */
// Homework 16
// Задание 1.
/* Используя синтаксис async/await отправить get запрос на 
https://jsonplaceholder.typicode.com/todos/1. Результат вывести в консоль. */

// Задание 2.
/* Используя синтаксис async/await отправить get запрос на 
https://jsonplaceholder.typicode.com/posts. Ответ должен содержать 10 элементов 
(query-параметр _limit). Результат вывести в консоль. */

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const todo1Url = `${BASE_URL}/todos/1`;
const tenPostsUrl = `${BASE_URL}/posts?_limit=10`;

// Задания 1 и 2
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(`// js // ${url}`, data);
  } catch (error) {
    console.error(error.message);
  }
};

loadData(todo1Url);
loadData(tenPostsUrl);
/* ===== END ===== */

const resourceUrl1 = `./scripts/homework-16.js`;

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
    pre.classList.add('language-js');
    codeBlock.appendChild(pre);
  }

  await highlightPreBlocks(codeBlock);
});
