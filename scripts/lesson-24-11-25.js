// console.log(`// js
// const BASE_URL = "https://jsonplaceholder.typicode.com";
// const usersUrl = \`\${BASE_URL}/users\`;
// const postsUrl = \`\${BASE_URL}/posts\`;
// const todosUrl = \`\${BASE_URL}/todos\`;

// const loadUsers = async () => {
//   const response = await fetch(usersUrl);
//   const users = await response.json();

//   return users;
// };

// const loadPosts = async () => {
//   const response = await fetch(postsUrl);
//   const posts = await response.json();

//   return posts;
// };

// const loadTodos = async () => {
//   const response = await fetch(todosUrl);
//   const todos = await response.json();

//   return todos;
// };

// // Последовательное выполнение запростов
// const loadAll = async () => {
//   const users = await loadUsers();
//   const posts = await loadPosts();
//   const todos = await loadTodos();

//   return [users, posts, todos];
// };

// loadAll().then(console.log);
// `);
const BASE_URL = "https://jsonplaceholder.typicode.com";
const usersUrl = `${BASE_URL}/users`;
const postsUrl = `${BASE_URL}/posts`;
const todosUrl = `${BASE_URL}/todos`;
const todoUrl = `${BASE_URL}/todos/1`;

// const loadUsers = async () => {
//   const response = await fetch(usersUrl);
//   const users = await response.json();

//   return users;
// };

// const loadPosts = async () => {
//   const response = await fetch(postsUrl);
//   const posts = await response.json();

//   return posts;
// };

// const loadTodos = async () => {
//   const response = await fetch(todosUrl);
//   const todos = await response.json();

//   return todos;
// };

// // // Одновременное выполнение запростов
// // const loadAll = async () => await Promise.all([loadUsers(), loadPosts(), loadTodos()]);

// // loadAll().then(console.log);

// // Последовательное выполнение запростов
// const loadAll = async () => {
//   const users = await loadUsers();
//   const posts = await loadPosts();
//   const todos = await loadTodos();

//   return [users, posts, todos];
// };

// loadAll().then(console.log);

// const loadData = async (url) => {
//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// };

// // Последовательное выполнение запростов
// const loadAll = async () => {
//   const users = await loadData(usersUrl);
//   const posts = await loadData(postsUrl);
//   const todos = await loadData(todosUrl);

//   return [users, posts, todos];
// };

// loadAll().then(console.log);

// // 2
// const loadTodo = async () => {
//   const response = await fetch(todoUrl);
//   const todo = await response.json();

//   return todo;
// };

// loadTodo().then(console.log);

// // 3
// const createPost = async () => {
//   const response = await fetch(postsUrl, {
//     method: "POST",
//     body: JSON.stringify({
//       title: "foo",
//       body: "bar",
//       userId: 1,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   const result = await response.json();
//   console.log(result);
// };

// createPost();

/* 4***. Создать функцию, которая будет отправлять асинхронные запросы на сервер с задержкой, 
используя setTimeout и await. Задержка должна быть случайной в пределах определенного диапазона. 
Дождаться выполнения каждого запроса перед отправкой следующего и вернуть массив результатов 
в том порядке, в котором они были отправлены. 
*/
const randomInt = (min = 0, max = 5) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomDelay = (min = 0, max = 5) =>
  new Promise((resolve) => setTimeout(resolve, randomInt(min, max) * 1000));

const loadAll = async (urls) => {
  const results = [];

  for (const url of urls) {
    const response = await fetch(url);
    console.log(`Запросили данные из ${url}`);

    await randomDelay(); // Иммитируем случайную задержку получения ответа

    const data = await response.json();
    console.log(`Получили данные из ${url}`);

    results.push(data);
  }

  return results;
};

// Использование
(async () => {
  const urls = [usersUrl, postsUrl, todosUrl];
  const data = await loadAll(urls);
  console.log(data); // Массив результатов в порядке отправки
})();
