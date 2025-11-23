/* App Todo */

// Ключ для localStorage
const todosKey = "todos";

// Тестовые данные при первом запуске (при пустом localStorage)
const mockData = [
  {
    id: "88bb9688",
    title: "Купить продукты",
    completed: false,
    date: 1763811000000,
    createdAt: 1763843550553,
  },
  {
    id: "3e8de8a2",
    title: "Залить проект на GitHub",
    completed: true,
    date: 1763845200000,
    createdAt: 1763843601410,
  },
  {
    id: "c3958f89",
    title: "Покормить кота",
    completed: false,
    date: 1763996400000,
    createdAt: 1763843666147,
  },
];

// Основной массив задач в памяти
let todos = getTodos() || mockData;

// id редактируемой задачи
let currentEditingId = null;

// DOM элементы
const todosListEl = document.querySelector("#todos-list");
const todosFilterEl = document.querySelector("#todos-filter");
const todosSearchEl = document.querySelector("#todos-search");
const cleanInputBtns = document.querySelectorAll(".clean-input-btn");
const addTodoBtn = document.querySelector("#add-todo-btn");
const todoDialogEl = document.querySelector("#todo-dialog");
const todoDialogActionBtn = document.querySelector("#todo-dialog-action-btn");
const cancelBtn = document.querySelector("#cancel-btn");

// Определяем текущую дату
now = new Date(); // Объявлена в timer.js (переделать на модуль???)
const weekday = now.toLocaleString("ru-RU", { weekday: "long" });
const date = now.toLocaleString("ru-RU", { day: "numeric", month: "long" });

// Отображаем текущую дату в заголовке приложения
document.querySelector(".current-weekday").textContent =
  capitalizeFirstLetter(weekday);
document.querySelector(".current-date").textContent = date;

// Получение списка todos из localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem(todosKey));
}

// Сохранение списка задач в localStorage
const storageTodos = () =>
  localStorage.setItem(todosKey, JSON.stringify(todos));

// Заглавная первая буква
function capitalizeFirstLetter(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : str;
}

// Поиск задачи по id
const findTodo = (id) => todos.find((todo) => todo.id === id);

// Фильтр по статусу выполнения
const filterByStatus = (list, status) =>
  status === "active"
    ? list.filter((todo) => !todo.completed)
    : status === "done"
    ? list.filter((todo) => todo.completed)
    : list;

// Фильтр по строке
const filterByString = (list, str) =>
  str ? list.filter((todo) => todo.title.toLowerCase().includes(str)) : list;

// Сортировка: сначала по выполнению, затем по дате
const sortTodos = (list) =>
  list
    .slice()
    .sort((a, b) =>
      a.completed !== b.completed ? a.completed - b.completed : a.date - b.date
    );

// Добавление задачи
const addTodo = (title, date) => {
  todos.push({
    id: crypto.randomUUID().slice(0, 8),
    title,
    completed: false,
    date: date.getTime(),
    createdAt: Date.now(),
  });

  storageTodos();
};

// Изменение задачи
const editTodo = (id, title, date) => {
  const todo = findTodo(id);
  if (!todo) return;

  todo.title = title;
  todo.date = date.getTime();

  storageTodos();
};

// Переключение состояния выполнено/не выполнено
const toggleTodo = (id) => {
  const todo = findTodo(id);
  if (!todo) return;

  todo.completed = !todo.completed;

  storageTodos();
};

// Удаление задачи
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);

  storageTodos();
};

// Создание HTML элемента задачи
const createTodoElement = (todo) => {
  const label = document.createElement("label");
  label.className = "todo";
  label.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

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

// Рендер списка задач
const renderTodos = () => {
  const filter =
    document.querySelector('input[name="filter"]:checked')?.id || "all";
  const searchStr = todosSearchEl.value.trim().toLowerCase();

  let todosList = todos;
  todosList = filterByStatus(todosList, filter);
  todosList = filterByString(todosList, searchStr);
  todosList = sortTodos(todosList);

  todosListEl.innerHTML = "";
  todosList.forEach((todo) => todosListEl.appendChild(createTodoElement(todo)));
};

/* ===== События ===== */

todosFilterEl.addEventListener("change", renderTodos);
todosSearchEl.addEventListener("input", renderTodos);

cleanInputBtns.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.currentTarget.parentElement.querySelector("input").value = "";
    renderTodos();
  })
);

// Слушатель кнопки открытия диалога добавления задачи
addTodoBtn.addEventListener("click", () => {
  currentEditingId = null;

  const now = new Date();

  document.querySelector("#new-todo-title").value = "";
  document.querySelector("#new-todo-date").value =
    now.toLocaleDateString("sv-SE");
  document.querySelector("#new-todo-time").value = now.toLocaleTimeString(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  todoDialogActionBtn.value = "Добавить";

  document.body.classList.toggle("no-scroll");
  todoDialogEl.classList.toggle("invisible");
});

todoDialogActionBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-todo-title").value.trim();
  const date = document.querySelector("#new-todo-date").value;
  const time = document.querySelector("#new-todo-time").value;

  if (!title) return;

  const datetime = new Date(`${date}T${time || "00:00"}`);

  if (currentEditingId) {
    editTodo(currentEditingId, title, datetime);
    currentEditingId = null;
    // todoDialogActionBtn.value = "Добавить"; // Протестировать!!!
  } else {
    addTodo(title, datetime);
  }

  document.body.classList.toggle("no-scroll");
  todoDialogEl.classList.toggle("invisible");

  renderTodos();
});

cancelBtn.addEventListener("click", () => {
  currentEditingId = null;

  document.body.classList.toggle("no-scroll");
  todoDialogEl.classList.toggle("invisible");

  // todoDialogActionBtn.value = "Добавить"; // Протестировать!!!
});

todosListEl.addEventListener("click", (event) => {
  const todoEl = event.target.closest(".todo");
  if (!todoEl) return;

  const id = todoEl.dataset.id;

  if (event.target.closest('input[type="checkbox"]')) {
    toggleTodo(id);
    renderTodos();
    return;
  }

  if (event.target.closest(".edit-btn")) {
    const todo = findTodo(id);
    if (!todo) return;

    currentEditingId = id;

    document.querySelector("#new-todo-title").value = todo.title;
    todoDialogActionBtn.value = "Изменить";

    const date = new Date(todo.date);

    // Устанавливаем дату в формате YYYY-MM-DD для input[type="date"]
    document.querySelector("#new-todo-date").value =
      date.toLocaleDateString("sv-SE");

    // Устанавливаем время в формате HH:MM для input[type="time"]
    document.querySelector("#new-todo-time").value = date.toLocaleTimeString(
      "sv-SE",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    document.body.classList.toggle("no-scroll");
    todoDialogEl.classList.toggle("invisible");
    return;
  }

  if (event.target.closest(".delete-btn")) {
    deleteTodo(id);
    renderTodos();
  }
});

// Первоначальный рендер списка задач
renderTodos();
