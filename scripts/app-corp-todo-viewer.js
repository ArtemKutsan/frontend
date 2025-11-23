const cleanInputBtns = document.querySelectorAll(".clean-input-btn");

const BASE_URL = "https://jsonplaceholder.typicode.com";
const todosUrl = `${BASE_URL}/todos`;
const usersUrl = `${BASE_URL}/users`;
let mergedData = [];

// Делаем заглавной первую букву в строке
const capitalizeFirstLetter = (str) =>
  str ? str[0].toUpperCase() + str.slice(1) : str;

// Объединение данных
const mergeTodosWithUsers = (todos, users) =>
  todos
    .map((todo) => {
      const user = users.find((u) => u.id === todo.userId);
      if (!user) return null;

      return {
        todoId: todo.id,
        title: todo.title,
        completed: todo.completed,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    })
    .filter(Boolean);

// Рендер списка todo
const renderTodos = (data, userId = "all") => {
  const todosListEl = document.querySelector("#todos-list");
  todosListEl.innerHTML = "";

  if (userId === "all") {
    data.forEach((todo) => {
      const todoCardDiv = document.createElement("div");

      todoCardDiv.className =
        "todo-card" + (todo.completed ? " completed" : "");

      todoCardDiv.innerHTML = `
        <span class="text-sm text-lite">${todo.user.name}</span>
        <span class="todo-title flex-1">${capitalizeFirstLetter(
          todo.title
        )}</span>
        <a href="mailto:${todo.user.email.toLowerCase()}" class="link text-xs">${todo.user.email.toLowerCase()}</a>
      `;

      todosListEl.appendChild(todoCardDiv);
    });
  } else {
    data.forEach((todo) => {
      const todoCardDiv = document.createElement("div");

      todoCardDiv.className =
        "todo-card" + (todo.completed ? " completed" : "");
      todoCardDiv.innerHTML = `<span class="todo-title">${capitalizeFirstLetter(
        todo.title
      )}</span>`;

      todosListEl.appendChild(todoCardDiv);
    });
  }
};

// Статистика
// Статистика
const calculateStatistics = (data, userInfo = null) => {
  const total = data.length;
  const completed = data.filter((todo) => todo.completed).length;
  const percent = total ? ((completed / total) * 100).toFixed(1) : 0;
  const remaining = total - completed;

  let statsHTML = `
    <span>Всего задач: ${total},</span>
    <span>Выполнено: ${completed} (${percent}%),</span>
    <span>Осталось: ${remaining}</span>
  `;

  if (userInfo) {
    statsHTML =
      `
      <span>Пользователь: ${userInfo.name}</span>
      (<a href="mailto:${userInfo.email.toLowerCase()}" class="link">${userInfo.email.toLowerCase()}</a>),
    ` + statsHTML;
  }

  document.querySelector("#stats").innerHTML = statsHTML;
};

// Фильтр по пользователю и получение информации о нём
const filterByUser = (data, userId) => {
  let userInfo = null;

  if (userId !== "all") {
    data = data.filter((todo) => String(todo.user.id) === String(userId));
    const sample = data[0];
    if (sample) userInfo = { name: sample.user.name, email: sample.user.email };
  }

  // Расчёт статистики сразу после фильтра по пользователю
  calculateStatistics(data, userInfo);

  return data;
};

// Фильтр по состоянию задачи: active/done
const filterByStatus = (data, filter) =>
  filter === "active"
    ? data.filter((todo) => !todo.completed)
    : filter === "done"
    ? data.filter((todo) => todo.completed)
    : data;

// Фильтр по поисковой строке
const filterBySearch = (data, searchStr) =>
  searchStr
    ? data.filter((todo) => todo.title.toLowerCase().includes(searchStr))
    : data;

// Сортировка задач по выполнению
const sortTodos = (data) => data.sort((a, b) => a.completed - b.completed);

// Общая функция применения фильтров (решение с промисами???)
const applyFilters = async () => {
  // console.log("Working applyFilters");
  const userId = document.querySelector("#user-select").value; // Возвращает "all" для All users или userId
  const filter =
    document.querySelector('input[name="filter"]:checked')?.id.toLowerCase() ||
    "all";
  const searchStr = document
    .querySelector("#todos-search")
    .value.trim()
    .toLowerCase();

  return Promise.resolve(mergedData)
    .then((data) => filterByUser(data, userId))
    .then((data) => filterByStatus(data, filter))
    .then((data) => filterBySearch(data, searchStr))
    .then(sortTodos)
    .then((data) => renderTodos(data, userId))
    .catch(console.error);
};

// // Общая функция применения фильтров (решение с промисами???)
// const applyFilters = async () => {
//   console.log("Working applyFilters");
//   const userId = document.querySelector("#user-select").value; // Возвращает "all" для All users или userId
//   const filter =
//     document.querySelector('input[name="filter"]:checked')?.id.toLowerCase() ||
//     "all";
//   const searchStr = document
//     .querySelector("#todos-search")
//     .value.trim()
//     .toLowerCase();

//   return Promise.resolve(mergedData)
//     .then((data) => filterByUser(data, userId))
//     .then((data) => filterByStatus(data, filter))
//     .then((data) => filterBySearch(data, searchStr))
//     .then(sortTodos)
//     .then((data) => renderTodos(data, userId))
//     .catch(console.error);
// };

// // Фильтрация обычная
// const applyFilters = () => {
//   const filter =
//     document.querySelector('input[name="filter"]:checked')?.id || "all";

//   const userId = document.querySelector("#user-select").value;
//   const searchStr = document
//     .querySelector("#todos-search")
//     .value.trim()
//     .toLowerCase();

//   let filtered = mergedData;
//   let statsData = mergedData;
//   let userInfo = null;

//   if (userId !== "all") {
//     filtered = filtered.filter((t) => t.user.id == userId);
//     statsData = filtered;

//     const sampleTodo = filtered[0];
//     if (sampleTodo) {
//       userInfo = {
//         name: sampleTodo.user.name,
//         email: sampleTodo.user.email,
//       };
//     }
//   }

//   calculateStatistics(statsData, userInfo);

//   if (filter === "active") {
//     filtered = filtered.filter((t) => !t.completed);
//   } else if (filter === "done") {
//     filtered = filtered.filter((t) => t.completed);
//   }

//   if (searchStr) {
//     filtered = filtered.filter((t) =>
//       t.title.toLowerCase().includes(searchStr)
//     );
//   }

//   sorted = filtered.sort((a, b) => a.completed - b.completed);

//   renderTodos(sorted, userInfo);
// }

cleanInputBtns.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.currentTarget.parentElement.querySelector("input").value = "";
    applyFilters();
  })
);

// Инициализация
Promise.all([
  fetch(todosUrl).then((response) => response.json()),
  fetch(usersUrl).then((response) => response.json()),
]).then(([todos, users]) => {
  mergedData = mergeTodosWithUsers(todos, users);

  // Заполнение select
  const userSelectEl = document.querySelector("#user-select");

  userSelectEl.innerHTML =
    `<option value="all">All users</option>` +
    users.map((u) => `<option value="${u.id}">${u.name}</option>`).join("");

  // Обработчики
  document
    .querySelector("#todos-search")
    .addEventListener("input", applyFilters);

  document
    .querySelectorAll('input[name="filter"]')
    .forEach((radio) => radio.addEventListener("change", applyFilters));

  document
    .querySelector("#user-select")
    .addEventListener("change", applyFilters);

  renderTodos(sortTodos(mergedData));
  calculateStatistics(mergedData);
});
