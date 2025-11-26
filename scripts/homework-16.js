console.log(`// js
/* Задание 1
Используя синтаксис async/await отправить get запрос на https://jsonplaceholder.typicode.com/todos/1. Результат вывести в консоль.
*/

/* Задание 2
Используя синтаксис async/await отправить get запрос на https://jsonplaceholder.typicode.com/posts. Ответ должен содержать 10 элементов (query-параметр _limit). Результат вывести в консоль.
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";
const todo1Url = \`\${BASE_URL}/todos/1\`;
const tenPostsUrl = \`\${BASE_URL}/posts?_limit=10\`;

// Задания 1 и 2
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(\`Error: \${response.status}\`);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

loadData(todo1Url);
loadData(tenPostsUrl);
`);

// Homework 16
/* Задание 1
Используя синтаксис async/await отправить get запрос на https://jsonplaceholder.typicode.com/todos/1. 
Результат вывести в консоль.
*/

/* Задание 2
Используя синтаксис async/await отправить get запрос на https://jsonplaceholder.typicode.com/posts. 
Ответ должен содержать 10 элементов (query-параметр _limit). Результат вывести в консоль.
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";
const todo1Url = `${BASE_URL}/todos/1`;
const tenPostsUrl = `${BASE_URL}/posts?_limit=10`;

// Задания 1 и 2
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

loadData(todo1Url);
loadData(tenPostsUrl);
