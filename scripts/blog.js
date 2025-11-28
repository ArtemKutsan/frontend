temp = {
  post: {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  author: {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  comments: [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et",
    },
    {
      postId: 1,
      id: 3,
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione",
    },
    {
      postId: 1,
      id: 4,
      name: "alias odio sit",
      email: "Lew@alysha.tv",
      body: "non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecati",
    },
    {
      postId: 1,
      id: 5,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione tempore iure ex voluptates in ratione harum architecto fugit inventore cupiditate voluptates magni quo et",
    },
  ],
};
// Summary 9
const BASE_URL = "https://jsonplaceholder.typicode.com";
const postsUrl = `${BASE_URL}/posts`;
const usersUrl = `${BASE_URL}/users`;
const commentsUrl = `${BASE_URL}/comments`;

// const posts = [];
// const users = [];
// const comments = [];
let blog = [];

// Делаем заглавной первую букву в строке
const capitalizeFirstLetter = (str) =>
  str ? str[0].toUpperCase() + str.slice(1) : str;

// Приложение должно отображать список постов, позволять фильтровать их по авторам, просматривать
// отдельный пост с комментариями и "создавать" новые посты.

// Технические требования:

// Загрузка данных:

// Сделать запросы к:
// /posts (статьи блога)
// /users (авторы)
// /comments (комментарии)
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

Promise.all([
  loadData(postsUrl),
  loadData(usersUrl),
  loadData(commentsUrl),
]).then(([postsData, usersData, commentsData]) => {
  blog = postsPreviews(postsData, usersData, commentsData);
  renderBlog(blog);
});

// Создание массива постов с авторами и комментариями
const postsPreviews = (posts, users, comments) =>
  posts.map((post) => {
    const author = users.find((user) => user.id === post.userId);
    const postComments = comments.filter(
      (comment) => comment.postId === post.id
    );

    return {
      id: post.id,
      title: post.title,
      author: {
        id: author.id,
        name: author.name,
      },
      description: post.body.slice(0, 100) + "...",
      commentsQty: postComments.length,
    };
  });

const renderPostCard = (post) => {
  // console.log({
  //   title: post.title,
  //   author: post.author.name,
  //   description: post.body.slice(0, 100) + "...",
  //   commentsQty: post.comments.length,
  // });

  const postCardDiv = document.createElement("div");
  postCardDiv.className = "py-4";

  postCardDiv.innerHTML = `
    <a class="text-sm text-lite no-underline" href="./author.html?authorId=${
      post.author.id
    }">${post.author.name}</a>
    <h4 class="post-title">${capitalizeFirstLetter(post.title)}</h4>
    <p class="post-body mb-2">${capitalizeFirstLetter(
      post.description
    )}<a class="link text-sm mx-2" href="./post.html?postId=${
    post.id
  }" data-id="${post.id}">Читать далее</a></p>
    <span class="text-sm text-lite">Комментарии: ${post.commentsQty}</span>
    
  `;

  document.querySelector("#posts-list").appendChild(postCardDiv);
};

const renderBlog = (blog) => blog.forEach((post) => renderPostCard(post));

// Главная страница - лента постов:
// Отобразить карточки постов. В каждой карточке:
// Заголовок поста
// Имя автора (найти по userId)
// Первые 100 символов текста поста + "..."
// Количество комментариев к этому посту
// Кнопка "Читать далее"

// Фильтрация:
// Выпадающий список с авторами (все пользователи)
// При выборе автора показывать только его посты
// Кнопка "Сбросить фильтр" для показа всех постов

// Страница отдельного поста:
// При клике на "Читать далее" или заголовок поста:
// Скрыть ленту постов
// Показать детальную страницу поста
// Отобразить: полный заголовок, полный текст, имя автора
// Список всех комментариев к этому посту (имя комментатора + текст)

// Навигация:
// Кнопка "Назад к ленте" на странице поста
// Заголовок сайта (который всегда ведет на главную)

// Создание нового поста:
// Форма над лентой постов с полями:
// Заголовок (input)
// Текст поста (textarea)
// Выбор автора (select)

// При отправке:
// Добавить новый пост в начало локального массива
// Немедленно отобразить его в ленте
// Очистить форму

// Поиск по постам:
// Поле поиска над лентой
// Поиск работает по заголовку и тексту поста
// Поиск должен работать совместно с фильтром по автору

// API Endpoints:

// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/comments
