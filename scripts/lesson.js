// https://jsonplaceholder.typicode.com/guide/

// const BASE_URL = "https://jsonplaceholder.typicode.com/";

// const requestBtn = document.querySelector("#make-request");

// requestBtn.addEventListener("click", () => {
//   createPost();
// });

// // GET
// async function getUsers() {
//   return fetch(`${BASE_URL}/users`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("// js", data);
//     })
//     .catch(console.error);
// }

// const newPost = {
//   userId: 4,
//   title: "Hello Post",
//   body: "This is my first hello post.",
// };

// // POST (posts)
// async function createPost() {
//   return fetch(`${BASE_URL}/posts`, {
//     method: "POST",
//     body: JSON.stringify(newPost),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("// js // response data", data);
//     })
//     .catch(console.error);
// }

// // PUT (user) — полная замена
// async function updateUser() {
//   const updatedUser = {
//     id: 3,
//     name: "Updated User",
//     username: "updated_username",
//     email: "updated@example.com",
//   };

//   return fetch(`${BASE_URL}/users/3`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedUser),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("// js // PUT user", data);
//     })
//     .catch(console.error);
// }

// // PATCH (post) — частичное обновление
// async function patchPost() {
//   const partialUpdate = {
//     title: "Only title changed",
//   };

//   return fetch(`${BASE_URL}/posts/1`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(partialUpdate),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("// js // PATCH post", data);
//     })
//     .catch(console.error);
// }

// // DELETE (post) — нормально вернуть promise и обработку
// async function deletePost() {
//   return fetch(`${BASE_URL}/posts/1`, {
//     method: "DELETE",
//   })
//     .then((response) => {
//       console.log("// js // DELETE status", response.status);
//     })
//     .catch(console.error);
// }

// // 1. GET /comments?email=Lew@alysha.tv
// const email = "Lew@alysha.tv";
// async function getCommentsByEmail() {
//   return fetch(`https://jsonplaceholder.typicode.com/comments?email=${email}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("comments by email", data);
//     })
//     .catch(console.error);
// }

// // 2. GET /users?username=Karianne&id=4
// const username = "Karianne";
// const id = 4;
// async function getUserByUsernameAndId() {
//   return fetch(
//     `https://jsonplaceholder.typicode.com/users?username=${username}&id=${id}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("user by username and id", data);
//     })
//     .catch(console.error);
// }

// 20.11.25
const BASE_URL = "https://jsonplaceholder.typicode.com";

// // Используя fetch для выполнения GET запроса к JSONPlaceholder
// // (URL: https://jsonplaceholder.typicode.com/users).
// // Выведите список пользователей в консоль.

// fetch(`${BASE_URL}/users`)
//   .then((response) => response.json())
//   .then(console.log)
//   .catch(console.error);

// // Используя fetch для выполнения POST запроса к JSONPlaceholder
// // (URL: https://jsonplaceholder.typicode.com/users).
// // Создайте объект пользователя с полями name, username, и email.
// // Отправьте POST запрос с созданным объектом пользователя.
// // Выведите ответ сервера в консоль.

// fetch(`${BASE_URL}/users`, {
//   method: "POST",
//   body: JSON.stringify({
//     name: "Artem",
//     username: "ArtemKutsan",
//     email: "artemkutsan@gmail.com",
//   }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then(console.log)
//   .catch(console.error);

// // Используя fetch для выполнения GET запроса к JSONPlaceholder
// // (URL: https://jsonplaceholder.typicode.com/posts).
// // Необходимо функцию рендера постов. Отобразить все посты.

// const postsContainer = document.querySelector("#posts");

// const renderPosts = (posts) =>
//   posts.map((post) =>
//     console.log(`Post Title: ${post.title}\nPost Content: ${post.body}`)
//   );

// fetch(`${BASE_URL}/posts`)
//   .then((response) => response.json())
//   .then(renderPosts)
//   .catch(console.error);

// Создать форму с полями Имя, Логин, Email, которая будет отправлять запрос на создание пользователя. Используем POST метод.
// *Используя fetch для выполнения GET запроса к JSONPlaceholder
// (URL: https://jsonplaceholder.typicode.com/todos).
// Необходимо написать функции получения и рендера первых 10 todos. Отобразить все todos.
// Если свойство completed равно true перечеркнуть задачу. К каждой задаче добавить иконку удаления, при клике на которую нужно выполнять DELETE запрос на этот todo.
const form = document.querySelector("form");
const todosContainer = document.querySelector("#todos");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.elements["name"].value.trim();
  const username = event.target.elements["username"].value.trim();
  const email = event.target.elements["email"].value.trim();

  const user = { name, username, email };

  fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then(console.log)
    .catch(console.error);
});

const renderTodos = (todos) =>
  todos.map((todo) =>
    console.log(`Todo ID: ${todo.id}\nTodo Title: ${todo.title}`)
  );

fetch(`${BASE_URL}/todos`)
  .then((response) => response.json())
  .then(renderTodos)
  .catch(console.error);
