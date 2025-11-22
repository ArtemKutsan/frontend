console.log(`// js
/* Необходимо сделать запрос на https://jsonplaceholder.typicode.com/. По пути (path)/users получить всех пользователей. На веб-странице для каждого пользователя отрисовать карточку и указать следующие данные: id, username, email, address.city, phone и company.name. Стили добавляем произвольно. 
*/
const BASE_URL = "https://jsonplaceholder.typicode.com";
const usersUrl = \`\${BASE_URL}/users\`;

fetch(usersUrl)
  .then((response) => response.json())
  .then((users) =>
    users.forEach((user) =>
      console.log(
        \`id: \${user.id}\\nusername: \${user.username}\\nemail: \${user.email}\\ncity: \${user.address.city}\\nphone: \${user.phone}\\ncompany: \${user.company.name}\`
      )
    )
  )
  .catch(console.error);

`);

// Homework 15
/* Необходимо сделать запрос на https://jsonplaceholder.typicode.com/. 
По пути (path)/users получить всех пользователей. На веб-странице для каждого 
пользователя отрисовать карточку и указать следующие данные: 
id, username, email, address.city, phone и company.name. Стили добавляем произвольно. 
*/
const BASE_URL = "https://jsonplaceholder.typicode.com";
const usersUrl = `${BASE_URL}/users`;

fetch(usersUrl)
  .then((response) => response.json())
  .then((users) =>
    users.forEach((user) =>
      console.log(
        `// txt id: ${user.id}\nusername: ${user.username}\nemail: ${user.email}\ncity: ${user.address.city}\nphone: ${user.phone}\ncompany: ${user.company.name}`
      )
    )
  )
  .catch(console.error);
