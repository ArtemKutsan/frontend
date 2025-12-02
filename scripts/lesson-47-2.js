import { fetchAsText } from './fetch-as-text.js';
import { highlightPreBlocks } from './shiki-pre.js';

/* ===== START ===== */
// Lesson 47.2
const urls = [
  // 'https://jsonplaceholder.typicode.com/errorUrl',
  'https://jsonplaceholder.typicode.com/todos',
  'https://jsonplaceholder.typicode.com/comments',
  'https://jsonplaceholder.typicode.com/users',
];

// 1.
/* Создать функцию, которая будет отправлять несколько асинхронных запросов на сервер параллельно, 
используя Promise.all. Дождаться выполнения всех запросов и вернуть массив результатов в том 
порядке, в котором они были отправлены. Используем новый синтаксис(async/await) в этой во всех 
последующих задачах. */
const fetchMultipleDataParallel = async (urls) => {
  try {
    const requests = urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText} at ${url}`);
      }

      const result = await response.json();

      return result;
    });

    // console.log(requests);
    const results = await Promise.all(requests);

    return results;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

fetchMultipleDataParallel(urls)
  .then((results) => console.log('// js // 1', results))
  .catch(console.error);

// 2.
/* Создать функцию, которая будет отправлять несколько асинхронных запросов на сервер 
последовательно, используя цикл и await. Дождаться выполнения каждого запроса перед отправкой 
следующего и вернуть массив результатов в том порядке, в котором они были отправлены. */
const fetchMultipleDataSequential = async (urls) => {
  try {
    const results = [];
    for (const url of urls) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText} at ${url}`);
      }
      const result = await response.json();
      results.push(result);
    }

    return results;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

fetchMultipleDataSequential(urls)
  .then((results) => console.log('// js // 2', results))
  .catch(console.error);

// 3. ***
/* Создать функцию, которая будет отправлять асинхронные запросы на сервер каждые 5 секунд, 
используя setInterval и await. Продолжать отправку запросов до тех пор, пока не будет получен 
определенный результат(например ошибка) или не пройдет определенное количество попыток. */
// async function fetchWithInterval(url, maxAttempts, desiredResult, ms) {}
// fetchWithInterval('/database', 15, "connected", 5000);

// 4. ***
/* Создать функцию, которая будет отправлять асинхронные запросы на сервер с задержкой, 
используя setTimeout и await. Задержка должна быть случайной в пределах определенного диапазона. 
Дождаться выполнения каждого запроса перед отправкой следующего и вернуть массив результатов в том 
порядке, в котором они были отправлены. */
// async function fetchMultipleDataWithRandomDelay(urls, minDelay, maxDelay) {}
// fetchMultipleDataWithRandomDelay(urls, 2000, 10000);

// 5.
/* Создать функцию, которая будет отправлять несколько асинхронных запросов на сервер параллельно, 
используя Promise.race. Дождаться выполнения любого из запросов и вернуть его результат. */
// async function fetchRace(urls) {}
/* ===== END ===== */

const resourceUrl = `./scripts/lesson-47-2.js`;

// fetchAsText(resourceUrl).then((data) => console.log(`// js ${data}`));
fetchAsText(resourceUrl).then(async (data) => {
  const codeBlock = document.querySelector('#code-block');
  if (!codeBlock) return;

  const pre = document.createElement('pre');

  const match = data.match(/\/\* ===== START ===== \*\/([\s\S]*?)\/\* ===== END ===== \*\//);
  if (match) {
    data = match[1].trim();
  }
  // Заменяем переносы внутри /* ... */
  data = data.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

  pre.textContent = data;
  pre.classList.add(`language-js`);
  codeBlock.appendChild(pre);

  await highlightPreBlocks(codeBlock);
});
