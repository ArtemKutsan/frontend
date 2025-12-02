console.log(`// js
/* 1. Создайте функцию waitForTime, которая возвращает Promise. Этот промис должен резолвиться через указанное количество миллисекунд, которое нужно передавать в функцию waitForTime в качестве аргумента. Если время вышло, промис резолвится с сообщением "Ожидание завершено". 
Например через секунды, 3 или 5 секунд. 
*/

const waitForTime = (interval) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(\`Ожидание \${interval} сек. завершено\`);
    }, interval * 1000)
  );

let interval = 5; // секунды

console.log(
  \`Вызываем функцию waitForTime возвращающую промис который зарезолвится через \${interval} секунд\`
);

waitForTime(interval)
  .then((data) => console.log(data, "Промис зарезолвился"))
  .catch((error) => console.error("Ошибка:", error));
`);

// Homework 14.1
const waitForTime = (interval) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(`Ожидание ${interval} сек. завершено`);
    }, interval * 1000)
  );

let interval = 5; // секунды

console.log(
  `Вызываем функцию waitForTime возвращающую промис который зарезолвится через ${interval} секунд`
);

waitForTime(interval)
  .then((data) => console.log(data, "Промис зарезолвился"))
  .catch((error) => console.error("Ошибка:", error));
