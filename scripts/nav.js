const navEl = document.querySelector('nav');
const navList = document.querySelector('header nav > ul');

const generateNavItems = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const authToken = localStorage.getItem('authToken');
  const isUserAuth = authToken ? users.filter((user) => user.token === authToken)[0] : null;

  if (authToken && isUserAuth) {
    return [
      {
        text: 'Home',
        title: 'Go to Home page',
        href: 'index.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Lesson',
        title: 'Go to Lesson page',
        href: 'lesson.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Practice',
        title: 'Go to Practice page',
        href: 'practice.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Homework',
        title: 'Go to Homework page',
        href: 'homework-18.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      // {
      //   text: "About",
      //   title: "Go to About page",
      //   href: "/about.html",
      //   type: "link",
      //   class: "",
      //   icon: "",
      // },
      {
        title: 'Projects',
        type: 'menu',
        items: [
          {
            text: 'Login/Register',
            title: 'Open Authorization',
            href: 'auth.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Todo.App',
            title: 'Open Todo.App',
            href: 'app-todo.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'CorpTodoViewer.App',
            title: 'Open CorpTodoViewer.App',
            href: 'app-corp-todo-viewer.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
        ],
      },
      {
        text: '',
        title: 'Open Profile',
        href: 'profile.html',
        type: 'link',
        class: 'btn btn-ghost',
        icon: '<i class="bi bi-person-fill text-lg"></i>',
      },
      {
        text: '',
        title: 'Logout',
        type: 'button',
        class: 'logout btn btn-ghost',
        icon: '<i class="bi bi-box-arrow-right text-lg"></i>',
      },
    ];
  } else {
    return [
      {
        text: 'Home',
        title: 'Go to Home page',
        href: 'index.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },

      {
        text: 'Lesson',
        title: 'Go to Lesson page',
        href: 'lesson.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Practice',
        title: 'Go to Practice page',
        href: 'practice.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Homework',
        title: 'Go to Homework page',
        href: 'homework-18.html',
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        title: 'Projects',
        type: 'menu',
        items: [
          {
            text: 'Login/Register',
            title: 'Open Authorization',
            href: 'auth.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Todo.App',
            title: 'Open Todo.App',
            href: 'app-todo.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'CorpTodoViewer.App',
            title: 'Open CorpTodoViewer.App',
            href: 'app-corp-todo-viewer.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Blog.App',
            title: 'Open Blog.App',
            href: 'blog.html',
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
        ],
      },
      // {
      //   text: "About",
      //   title: "Go to About page",
      //   href: "/about.html",
      //   type: "link",
      //   class: "",
      //   icon: "",
      // },
    ];
  }
};

const navItems = generateNavItems();

// Создание обычной ссылки навигации
const createLinkEl = (link) => {
  const liEl = document.createElement('li');

  liEl.innerHTML = link.icon
    ? link.text
      ? `<a title="${link.title}" class="${link.class}" href="${link.href}">${link.icon}<span>${link.text}</span></a>`
      : `<a title="${link.title}" class="${link.class}" href="${link.href}">${link.icon}</a>`
    : `<a title="${link.title}" class="${link.class}" href="${link.href}">${link.text}</a>`;

  return liEl;
};

// Создание кнопки навигации
const createButtonEl = (button) => {
  const buttonEl = document.createElement('button');
  buttonEl.className = button.class;
  buttonEl.title = button.title;

  buttonEl.innerHTML = button.icon
    ? button.text
      ? `${button.icon}<span>${button.text}</span>`
      : `${button.icon}`
    : `${button.text}`;

  return buttonEl;
};

// Создание выпадающего меню навигации
const createMenuEl = (menu) => {
  const liEl = document.createElement('li');
  liEl.className = 'dropdown';

  const buttonEl = document.createElement('button');
  buttonEl.className = 'btn btn-invisible mx-1';
  buttonEl.title = menu.title || '';
  buttonEl.textContent = menu.title || 'Menu';

  const menuUlEl = document.createElement('ul');
  menuUlEl.className = 'dropdown-content';

  menu.items.forEach((item) => {
    if (item.type !== 'link') return;

    const menuLiEl = document.createElement('li');
    menuLiEl.innerHTML = `<a title="${item.title}" class="${item.class}" href="${item.href}">
      ${item.icon || ''}${item.text}
    </a>`;

    menuUlEl.appendChild(menuLiEl);
  });

  liEl.appendChild(buttonEl);
  liEl.appendChild(menuUlEl);

  return liEl;
};

// Рендер всей навигации
const navRender = (navEl, navList, navItems) => {
  navItems.forEach((item) => {
    if (item.type === 'link') {
      navList.appendChild(createLinkEl(item));
      return;
    }

    if (item.type === 'button') {
      navEl.appendChild(createButtonEl(item));
      return;
    }

    if (item.type === 'menu') {
      navList.appendChild(createMenuEl(item));
      return;
    }
  });
};

navRender(navEl, navList, navItems);

const logoutBtns = document.querySelectorAll('.logout');

logoutBtns.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.pathname = 'index.html';
  });
});
