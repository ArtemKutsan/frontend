/* App Todo */

// Ключи для localStorage
const todosKey = "todos";
const trashKey = "trash";

// Тестовые данные при первом запуске (при пустом localStorage)
const mockTodosData = [
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

// Тестовые данные при первом запуске (при пустом localStorage)
mockTrashData = [
  {
    id: "c3958f89",
    title: "Купить батарейки",
    completed: true,
    date: 1763996400000,
    createdAt: 1763843666147,
    deleted: true,
  },
];

// Основные массивы задач в памяти
let todos = getData(todosKey) || mockTodosData;
let trash = getData(trashKey) || mockTrashData;

// id редактируемой задачи
let currentEditingId = null;

// DOM элементы
const todosListEl = document.querySelector("#todos-list");
const todosFilterEls = document.querySelectorAll(".todos-filter");
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

// Получение данных из localStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Сохранение данных в localStorage
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Выбирает слово с правильным окончанием в зависимости от числа
const pluralize = (n, one, few, many) => {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const last = abs % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
};

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
    : status === "deleted"
    ? trash
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

  setData(todosKey, todos);
};

// Изменение задачи
const editTodo = (id, title, date) => {
  const todo = findTodo(id);
  if (!todo) return;

  todo.title = title;
  todo.date = date.getTime();

  setData(todosKey, todos);
};

// Пермещение в корзину
// const moveToTrash = (todo) => {};

// Переключение состояния выполнено/не выполнено
const toggleTodo = (id) => {
  const todo = findTodo(id);
  if (!todo) return;

  todo.completed = !todo.completed;

  setData(todosKey, todos);
};

// Удаление задачи
const deleteTodo = (id) => {
  // todos = todos.filter((todo) => todo.id !== id);
  const { remaining, removed } = todos.reduce(
    (acc, todo) =>
      todo.id === id
        ? { remaining: acc.remaining, removed: todo }
        : (acc.remaining.push(todo), acc),
    { remaining: [], removed: null }
  );

  todos = remaining;
  setData(todosKey, todos);

  removed.deleted = true;
  trash.push(removed);
  setData(trashKey, trash);
};

// Восстановление удаленной задачи из корзины
const restoreTodo = (id) => {
  const { remaining, restored } = trash.reduce(
    (acc, todo) =>
      todo.id === id
        ? { remaining: acc.remaining, restored: todo }
        : (acc.remaining.push(todo), acc),
    { remaining: [], restored: null }
  );

  trash = remaining;
  setData(trashKey, trash);

  const resoredTodo = {
    id: restored.id,
    title: restored.title,
    completed: restored.completed,
    date: restored.date,
    createdAt: restored.createdAt,
  };

  todos.push(resoredTodo);
  setData(todosKey, todos);
};

// Применяем фильтры
const applyFilters = () => {
  const filter =
    document.querySelector('input[name="filter"]:checked')?.id || "all";
  const searchStr = todosSearchEl.value.trim().toLowerCase();

  let todosList = filterByStatus(todos, filter);
  todosList = filterByString(todosList, searchStr);
  todosList = sortTodos(todosList);

  return todosList;
};

// Создание HTML элемента задачи
const createTodoElement = (todo) => {
  const divEl = document.createElement("div");
  divEl.className = "todo";
  divEl.dataset.id = todo.id;

  const labelEl = document.createElement("label");
  // labelEl.className = "todo";
  // labelEl.dataset.id = todo.id;

  const checkboxInputEl = document.createElement("input");
  checkboxInputEl.type = "checkbox";
  checkboxInputEl.checked = todo.completed;

  const spanCheckboxEl = document.createElement("span");
  spanCheckboxEl.className = "checkbox";

  const divTodoContentEl = document.createElement("div");
  divTodoContentEl.className = "todo-content";

  const spanTodoDatetimeEl = document.createElement("span");
  spanTodoDatetimeEl.className = "todo-datetime";
  spanTodoDatetimeEl.textContent = new Date(todo.date).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  const spanTodoTitleEl = document.createElement("span");
  spanTodoTitleEl.className = "todo-title";
  spanTodoTitleEl.textContent = todo.title;

  if (!todo.deleted) {
    const buttonEditBtnEl = document.createElement("button");
    buttonEditBtnEl.type = "button";
    buttonEditBtnEl.className = "edit-btn btn btn-ghost";
    buttonEditBtnEl.innerHTML = `<span class="text-2xl material-symbols-outlined">edit</span>`;

    const buttonDeleteBtnEl = document.createElement("button");
    buttonDeleteBtnEl.type = "button";
    buttonDeleteBtnEl.className = "delete-btn btn btn-ghost";
    buttonDeleteBtnEl.innerHTML = `<span class="text-2xl material-symbols-outlined">delete</span>`;

    labelEl.append(checkboxInputEl, spanCheckboxEl);
    divTodoContentEl.append(spanTodoDatetimeEl, spanTodoTitleEl);
    divEl.append(labelEl, divTodoContentEl, buttonEditBtnEl, buttonDeleteBtnEl);
  } else {
    spanCheckboxEl.classList.add("inactive"); // Делаем chrckbox неактивным

    const buttonRestoreBtnEl = document.createElement("button");
    buttonRestoreBtnEl.type = "button";
    buttonRestoreBtnEl.className = "restore-btn btn btn-ghost";
    buttonRestoreBtnEl.innerHTML = `<span class="text-2xl material-symbols-outlined">restore_from_trash</span>`;

    labelEl.append(checkboxInputEl, spanCheckboxEl);
    divTodoContentEl.append(spanTodoDatetimeEl, spanTodoTitleEl);
    divEl.append(labelEl, divTodoContentEl, buttonRestoreBtnEl);
  }

  // labelEl.append(checkboxInputEl, spanCheckboxEl);
  // divTodoContentEl.append(spanTodoDatetimeEl, spanTodoTitleEl);
  // divEl.append(labelEl, divTodoContentEl, buttonEditBtnEl, buttonDeleteBtnEl);

  return divEl;
};

// Рендер (добавление в слой div #todos-list) элемент созданный для каждой задачи
const renderTodos = () => {
  const filteredTodos = applyFilters();
  const todosQty = filteredTodos.length;
  const wordFind = pluralize(todosQty, "Найдена", "Найдено", "Найдено");
  const wordTask = pluralize(todosQty, "задача", "задачи", "задач");

  // Очищаем все в div #todos-list (все отрендеренные ранее задачи) и пишем туда html со строкой:
  // "Найдено n задач"
  todosListEl.innerHTML = `<span>${wordFind} ${todosQty} ${wordTask}</span>`;

  // Добавляем после строки выше в цикле элемент html который создаем createTodoElement
  // для каждой задачи (слой div .todo и всем содержимым)
  filteredTodos.forEach((todo) =>
    todosListEl.appendChild(createTodoElement(todo))
  );
};

/* ===== События ===== */

// Обработчик события выбора статуса выполнения
// todosFilterEl.addEventListener("change", renderTodos);
todosFilterEls.forEach((filter) =>
  filter.addEventListener("change", renderTodos)
);

// Обработчик события ввода в строку поиска
todosSearchEl.addEventListener("input", renderTodos);

// Обработчики событий кнопок очистки введенной строки на всех input (text)
cleanInputBtns.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.currentTarget.parentElement.querySelector("input").value = "";
    renderTodos();
  })
);

// Обработчик события нажатия кнопки открытия диалога добавления задачи
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

  if (event.target.closest(".restore-btn")) {
    restoreTodo(id);
    renderTodos();
  }
});

// Первоначальный рендер списка задач
renderTodos();
