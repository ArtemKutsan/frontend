console.log(`// js
/* Задание 1
Используя синтаксис try/catch, отправить запрос на https://jsonplaceholder.typicode.com/posts?userId=1, в блоке catch сделать вывод консоль сообщения об ошибке. Для проверки блока catch сделать намеренную ошибку в url запроса.
*/

/* Задание 2
Написать функцию, которая делит одно число на другое, обрабатывая возможные ошибки деления на ноль.
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";
const postsUserId1 = \`\${BASE_URL}/posts?userId=1\`;
const errorUrl = \`\${BASE_URL}/errorUrl\`;

// 1
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

loadData(errorUrl);
// loadData(postsUserId1);

// 2
const div = (a, b) => {
  try {
    if (!b) throw new Error("Ошибка: Деление на 0!");
    return a / b;
  } catch (error) {
    return error.message;
  }
};

console.log(div(10, 5));
console.log(div(10, 0));
`);

// Homework 16.1
/* Задание 1
Используя синтаксис try/catch, отправить запрос на https://jsonplaceholder.typicode.com/posts?userId=1, 
в блоке catch сделать вывод консоль сообщения об ошибке. Для проверки блока catch сделать намеренную ошибку в url запроса.
*/

/* Задание 2
Написать функцию, которая делит одно число на другое, обрабатывая возможные ошибки деления на ноль.
*/

const BASE_URL = "https://jsonplaceholder.typicode.com";
const postsUserId1 = `${BASE_URL}/posts?userId=1`;
const errorUrl = `${BASE_URL}/errorUrl`;

// 1
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

loadData(errorUrl);
// loadData(postsUserId1);

// 2
const div = (a, b) => {
  try {
    if (!b) throw new Error("Ошибка: Деление на 0!");
    return a / b;
  } catch (error) {
    return error.message;
  }
};

console.log(`10 / 5 = ${div(10, 5)}`);
console.log(`10 / 0 = ${div(10, 0)}`);
