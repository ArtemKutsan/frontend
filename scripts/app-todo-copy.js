/* App Todo */

const todosKey = "todos";
const todosListEl = document.querySelector("#todos-list");
const todosFilterEl = document.querySelector("#todos-filter");
const todosSearchEl = document.querySelector("#todos-search");
const cleanInputBtns = document.querySelectorAll(".clean-input-btn");
const addTodoBtn = document.querySelector("#add-todo-btn");
const actionTodoDiv = document.querySelector("#action-todo");
const actionTodoBtn = document.querySelector("#action-todo-btn");
const cancelBtn = document.querySelector("#cancel-btn");

// Тестовые данные для отображения при первом старте приложения
mockData = [
  {
    id: "88bb9688",
    title: "Купить продукты",
    done: false,
    date: 1763811000000,
    createdAt: 1763843550553,
  },
  {
    id: "3e8de8a2",
    title: "Залить проект на GitHub",
    done: true,
    date: 1763845200000,
    createdAt: 1763843601410,
  },
  {
    id: "c3958f89",
    title: "Разобраться с неправильными датами в Todo.App",
    done: false,
    date: 1763996400000,
    createdAt: 1763843666147,
  },
];

// id редактируемой задачи
let currentEditingId = null;

// Определяем текущую дату
now = new Date(); // Объявлена в timer.js (переделать на модуль???)
const weekday = now.toLocaleString("ru-RU", { weekday: "long" });
const date = now.toLocaleString("ru-RU", { day: "numeric", month: "long" });

// Отображаем текущую дату в заголовке приложения
document.querySelector(".current-weekday").textContent =
  capitalizeFirstLetter(weekday);
document.querySelector(".current-date").textContent = date;

// Делаем заглавной первую букву в строке
function capitalizeFirstLetter(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : str;
}

// Получение списка задач
const getTodos = () => JSON.parse(localStorage.getItem(todosKey)) || mockData;

// Сохранение списка задач в localStorage
const storageTodos = (todos) =>
  localStorage.setItem(todosKey, JSON.stringify(todos));

// Изменение задачи
const editTodo = (id, editedTitle, editedDate) => {
  const todos = getTodos();
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.title = editedTitle;
    todo.date = editedDate.getTime(); // timestamp

    storageTodos(todos);
    renderTodos();
  }
};

// Добавление задачи
const addTodo = (title, date) => {
  const todos = getTodos();
  const newTodo = {
    id: crypto.randomUUID().slice(0, 8),
    title,
    done: false,
    date: date.getTime(), // timestamp
    createdAt: Date.now(),
  };

  todos.push(newTodo);

  storageTodos(todos);
  renderTodos();
};

// Переключение состояния задачи (выполнена/активна)
const toggleTodo = (id) => {
  const todos = getTodos();
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.done = !todo.done;

    storageTodos(todos);
    renderTodos();
  }
};

// Удаление задачи
const deleteTodo = (id) => {
  const todos = getTodos().filter((todo) => todo.id !== id);

  storageTodos(todos);
  renderTodos();
};

// Фильтр по выполнению
const filterByStatus = (todos, filter) =>
  filter === "active"
    ? todos.filter((todo) => !todo.done)
    : filter === "done"
    ? todos.filter((todo) => todo.done)
    : todos;

// Фильтр по поиску
const filterBySearch = (todos, searchStr) =>
  searchStr
    ? todos.filter((todo) => todo.title.toLowerCase().includes(searchStr))
    : todos;

// Сортировка по выполнению и следом по дате
const sortTodos = (todos) =>
  todos
    .slice() // Для предотвращения мутации. Проверить нужно ли???
    .sort((a, b) => (a.done !== b.done ? a.done - b.done : a.date - b.date));

// Создание todo HTML элемента
const createTodoElement = (todo) => {
  const label = document.createElement("label");
  label.className = "todo";
  label.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  const spanCheckbox = document.createElement("span");
  spanCheckbox.className = "checkbox";

  const contentDiv = document.createElement("div");
  contentDiv.className = "todo-content";

  const dateSpan = document.createElement("span");
  dateSpan.className = "todo-datetime";
  dateSpan.textContent = new Date(todo.date).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  const titleSpan = document.createElement("span");
  titleSpan.className = "todo-title";
  titleSpan.textContent = todo.title;

  const buttonEdit = document.createElement("button");
  buttonEdit.type = "button";
  buttonEdit.className = "edit-btn btn btn-ghost";
  buttonEdit.innerHTML = `<span class="text-2xl material-symbols-outlined">edit</span>`;

  const buttonDelete = document.createElement("button");
  buttonDelete.type = "button";
  buttonDelete.className = "delete-btn btn btn-ghost";
  buttonDelete.innerHTML = `<span class="text-2xl material-symbols-outlined">delete</span>`;

  contentDiv.append(dateSpan, titleSpan);

  label.append(checkbox, spanCheckbox, contentDiv, buttonEdit, buttonDelete);

  return label;
};

// Рендер/добавление всех todo
const renderTodos = () => {
  let todos = getTodos();
  const filter =
    document.querySelector('input[name="filter"]:checked')?.id || "all";
  const searchStr = todosSearchEl.value.trim().toLowerCase();

  todos = filterByStatus(todos, filter);
  todos = filterBySearch(todos, searchStr);
  todos = sortTodos(todos);

  todosListEl.innerHTML = "";

  todos.forEach((todo) => todosListEl.appendChild(createTodoElement(todo)));
};

// // Отрисовка списка задач
// const renderTodos = () => {
//   const todos = getTodos();
//   const filter =
//     document.querySelector('input[name="filter"]:checked')?.id || "all";
//   const searchStr = todosSearchEl.value.trim().toLowerCase();

//   todosListEl.innerHTML = "";

//   todos
//     .filter((t) => {
//       if (filter === "active") return !t.done;
//       if (filter === "done") return t.done;
//       return true;
//     })
//     .filter((t) => t.title.toLowerCase().includes(searchStr))
//     .sort((a, b) => (a.done !== b.done ? a.done - b.done : a.date - b.date))
//     .forEach((t) => {
//       const label = document.createElement("label");
//       label.className = "todo";
//       label.dataset.id = t.id;

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = t.done;
//       checkbox.addEventListener("change", () => toggleTodo(t.id));

//       const spanCheckbox = document.createElement("span");
//       spanCheckbox.className = "checkbox";

//       const contentDiv = document.createElement("div");
//       contentDiv.className = "todo-content";

//       const dateSpan = document.createElement("span");
//       dateSpan.className = "todo-datetime";
//       dateSpan.textContent = new Date(t.date).toLocaleString("ru-RU", {
//         day: "numeric",
//         month: "long",
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       const titleSpan = document.createElement("span");
//       titleSpan.className = "todo-title";
//       titleSpan.textContent = t.title;

//       const buttonEdit = document.createElement("button");
//       buttonEdit.type = "button";
//       buttonEdit.className = "edit-btn btn btn-ghost";
//       buttonEdit.innerHTML = `<span class="text-2xl material-symbols-outlined">edit</span>`;

//       const buttonDelete = document.createElement("button");
//       buttonDelete.type = "button";
//       buttonDelete.className = "delete-btn btn btn-ghost";
//       buttonDelete.innerHTML = `<span class="text-2xl material-symbols-outlined">delete</span>`;

//       contentDiv.append(dateSpan, titleSpan);
//       label.append(
//         checkbox,
//         spanCheckbox,
//         contentDiv,
//         buttonEdit,
//         buttonDelete
//       );
//       todosListEl.appendChild(label);
//     });
// };

// // Создание одного todo-элемента
// const createTodoEl = (t) => {
//   const todoLabelEl = document.createElement("label");
//   todoLabelEl.className = "todo";
//   todoLabelEl.dataset.id = t.id;

// 	const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.checked = t.done;
//   checkbox.addEventListener("change", () => toggleTodo(t.id));

// 	const spanCheckbox = document.createElement("span");
//   spanCheckbox.className = "checkbox";

// 	const contentDiv = document.createElement("div");
//   contentDiv.className = "todo-content";

// 	const dateSpan = document.createElement("span");
//   dateSpan.className = "todo-datetime";
//   dateSpan.textContent = new Date(t.date).toLocaleString("ru-RU", {
//     day: "numeric",
//     month: "long",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

// 	const titleSpan = document.createElement("span");
//   titleSpan.className = "todo-title";
//   titleSpan.textContent = t.title;

// 	const buttonEdit = document.createElement("button");
//   buttonEdit.type = "button";
//   buttonEdit.className = "edit-btn btn btn-ghost";
//   buttonEdit.innerHTML = `<span class="text-2xl material-symbols-outlined">edit</span>`;

// 	const buttonDelete = document.createElement("button");
//   buttonDelete.type = "button";
//   buttonDelete.className = "delete-btn btn btn-ghost";
//   buttonDelete.innerHTML = `<span class="text-2xl material-symbols-outlined">delete</span>`;
//   contentDiv.append(dateSpan, titleSpan);
//   todoLabelEl.append(
//     checkbox,
//     spanCheckbox,
//     contentDiv,
//     buttonEdit,
//     buttonDelete
//   );

// 	return todoLabelEl;
// };

// // Отрисовка списка задач
// const renderTodos = () => {
//   const todos = getTodos();
//   const filter =
//     document.querySelector('input[name="filter"]:checked')?.id || "all";
//   const searchStr = todosSearchEl.value.trim().toLowerCase();

// 	todosListEl.innerHTML = "";

// 	todos
//     .filter((t) => {
//       if (filter === "active") return !t.done;
//       if (filter === "done") return t.done;
//       return true;
//     })
//     .filter((t) => t.title.toLowerCase().includes(searchStr))
//     .sort((a, b) => (a.done !== b.done ? a.done - b.done : a.date - b.date))
//     .forEach((t) => todosListEl.appendChild(createTodoEl(t)));
// };

// // Отрисовка списка задач
// const renderTodos = () => {
//   const todos = getTodos();
//   const filter =
//     document.querySelector('input[name="filter"]:checked')?.id || "all";
//   const searchStr = todosSearchEl.value.trim().toLowerCase();

//   todosListEl.innerHTML = "";

//   todos
//     .filter((t) => {
//       if (filter === "active") return !t.done;
//       if (filter === "done") return t.done;
//       return true;
//     })
//     .filter((t) => t.title.toLowerCase().includes(searchStr))
//     .sort((a, b) => (a.done !== b.done ? a.done - b.done : a.date - b.date))
//     .forEach((t) => {
//       const label = document.createElement("label");
//       label.className = "todo";
//       label.dataset.id = t.id;

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = t.done;
//       checkbox.addEventListener("change", () => toggleTodo(t.id));

//       const spanCheckbox = document.createElement("span");
//       spanCheckbox.className = "checkbox";

//       const contentDiv = document.createElement("div");
//       contentDiv.className = "todo-content";

//       const dateSpan = document.createElement("span");
//       dateSpan.className = "todo-datetime";
//       dateSpan.textContent = new Date(t.date).toLocaleString("ru-RU", {
//         day: "numeric",
//         month: "long",
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       const titleSpan = document.createElement("span");
//       titleSpan.className = "todo-title";
//       titleSpan.textContent = t.title;

//       const buttonEdit = document.createElement("button");
//       buttonEdit.type = "button";
//       buttonEdit.className = "edit-btn btn btn-ghost";
//       buttonEdit.innerHTML = `<span class="text-2xl material-symbols-outlined">edit</span>`;

//       const buttonDelete = document.createElement("button");
//       buttonDelete.type = "button";
//       buttonDelete.className = "delete-btn btn btn-ghost";
//       buttonDelete.innerHTML = `<span class="text-2xl material-symbols-outlined">delete</span>`;

//       contentDiv.append(dateSpan, titleSpan);
//       label.append(
//         checkbox,
//         spanCheckbox,
//         contentDiv,
//         buttonEdit,
//         buttonDelete
//       );
//       todosListEl.appendChild(label);
//     });
// };

// Обработчики событий
todosFilterEl.addEventListener("change", renderTodos);
todosSearchEl.addEventListener("input", renderTodos);
cleanInputBtns.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.currentTarget.parentElement.querySelector("input").value = "";
    renderTodos();
  })
);

addTodoBtn.addEventListener("click", () => {
  document.querySelector("#new-todo-title").value = "";
  document.querySelector("#new-todo-date").value = new Date()
    .toISOString()
    .slice(0, 10);
  document.querySelector("#new-todo-time").value = new Date()
    .toISOString()
    .slice(11, 16);

  currentEditingId = null;
  document.querySelector("#action-todo-btn").value = "Добавить";

  document.body.classList.toggle("no-scroll");
  actionTodoDiv.classList.toggle("invisible");
});

actionTodoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newTodoTitle = document.querySelector("#new-todo-title").value.trim();
  const newTodoDate = document.querySelector("#new-todo-date").value;
  const newTodoTime = document.querySelector("#new-todo-time").value;

  const dateTime = new Date(`${newTodoDate}T${newTodoTime || "00:00"}`);

  if (newTodoTitle) {
    if (currentEditingId) {
      editTodo(currentEditingId, newTodoTitle, dateTime);
      currentEditingId = null;
      document.querySelector("#action-todo-btn").value = "Добавить";
    } else {
      addTodo(newTodoTitle, dateTime);
    }
  } else {
    // Реализовать логику того, что поле title задачи не может быть пустым
  }

  document.body.classList.toggle("no-scroll");
  actionTodoDiv.classList.toggle("invisible");
});

cancelBtn.addEventListener("click", () => {
  currentEditingId = null;
  document.querySelector("#action-todo-btn").value = "Добавить";
  document.body.classList.toggle("no-scroll");
  actionTodoDiv.classList.toggle("invisible");
});

todosListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".btn");
  if (!button) return;

  if (button.classList.contains("edit-btn")) {
    const todoLabel = button.closest(".todo");
    const todoId = todoLabel.dataset.id;

    const todo = getTodos().find((todo) => todo.id === todoId);
    if (!todo) return;

    currentEditingId = todoId;

    document.querySelector("#new-todo-title").value = todo.title.trim();
    document.querySelector("#action-todo-btn").value = "Изменить";

    const iso = new Date(todo.date).toISOString();
    document.querySelector("#new-todo-date").value = iso.slice(0, 10);
    document.querySelector("#new-todo-time").value = iso.slice(11, 16);

    document.body.classList.toggle("no-scroll");
    actionTodoDiv.classList.toggle("invisible");
  } else if (button.classList.contains("delete-btn")) {
    const todoLabel = button.closest(".todo");
    const todoId = todoLabel.dataset.id;

    deleteTodo(todoId);
  }
});

// Первоначальный рендер списка задач
renderTodos();
