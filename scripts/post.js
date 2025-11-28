// scripts/post.js
const BASE_URL = "https://jsonplaceholder.typicode.com";

const params = new URLSearchParams(window.location.search);

const postId = params.get("postId");
// const authorId = params.get("authorId");

// Делаем заглавной первую букву в строке
const capitalizeFirstLetter = (str) =>
  str ? str[0].toUpperCase() + str.slice(1) : str;

const loadPost = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/posts/${id}?_expand=user&_embed=comments`
    );

    if (!response.ok) throw new Error(`Error loading data: ${response.status}`);

    const post = await response.json();

    console.log(post);
    return post;
  } catch (error) {
    console.error(error.message);
  }
};

const renderPost = (post) => {
  const postDiv = document.createElement("div");

  postDiv.classList.add("post");

  postDiv.innerHTML = `
    <h2 class="post-title">${capitalizeFirstLetter(post.title)}</h2>
    <p class="post-body">${capitalizeFirstLetter(post.body)}</p>`;

  document.querySelector("#post-content").appendChild(postDiv);
};

loadPost(postId).then(renderPost);
