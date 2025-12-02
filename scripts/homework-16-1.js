import { fetchAsText } from './fetch-as-text.js';
import { highlightPreBlocks } from './shiki-pre.js';

/* ===== START ===== */
// Homework 16.1
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const postsUserId1 = `${BASE_URL}/posts?userId=1`;
const errorUrl = `${BASE_URL}/errorUrl`;

// Задание 1.
/* Используя синтаксис try/catch, отправить запрос на 
https://jsonplaceholder.typicode.com/posts?userId=1, в блоке catch сделать вывод консоль сообщения 
об ошибке. Для проверки блока catch сделать намеренную ошибку в url запроса. */
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

loadData(errorUrl);
// loadData(postsUserId1);

// Задание 2.
/* Написать функцию, которая делит одно число на другое, обрабатывая возможные ошибки деления на 
ноль. */
const div = (a, b) => {
  try {
    if (!b) throw new Error('Ошибка: Деление на 0!');
    return a / b;
  } catch (error) {
    return error.message;
  }
};

console.log(`10 / 5 = ${div(10, 5)}`);
console.log(`10 / 0 = ${div(10, 0)}`);
/* ===== END ===== */

const resourceUrl1 = `./scripts/homework-16-1.js`;

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
