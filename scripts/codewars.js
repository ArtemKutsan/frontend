/* Описание:

Правила игры «Камень, Ножницы, Бумага»:

Камень побеждает Ножницы,
Ножницы побеждают Бумагу,
Бумага побеждает Камень,

Два одинаковых хода считаются ничьей.

Давайте играть! Вам будут предложены допустимые ходы двух игроков в «Камень, Ножницы, Бумага» и 
нужно будет указать, кто из них выиграл: «Игрок 1 выиграл!» для игрока 1 и «Игрок 2 выиграл!» 
для игрока 2. В случае ничьей верните «Ничья!».
*/
const rockPaperScissors = (p1, p2) => {
  const choice = { rock: 0, paper: 1, scissors: 2 };
  const winner = (choice[p1] - choice[p2] + 3) % 3;

  return winner ? `Player ${winner} won!` : "Draw!";
};

console.log(rockPaperScissors("rock", "scissors"));
console.log(rockPaperScissors("scissors", "paper"));
console.log(rockPaperScissors("paper", "rock"));

console.log(rockPaperScissors("scissors", "rock"));
console.log(rockPaperScissors("paper", "scissors"));
console.log(rockPaperScissors("rock", "paper"));

console.log(rockPaperScissors("scissors", "paper"));
console.log(rockPaperScissors("scissors", "rock"));
console.log(rockPaperScissors("paper", "paper"));

const rockPaperScissorsLizardSpock = (p1, p2) => {
  const choice = { rock: 0, paper: 1, scissors: 2, lizard: 1, spock: 0 };
  const winner = (choice[p1] - choice[p2] + 3) % 3;

  return winner ? `Player ${winner} won!` : "Draw!";
};

console.log(rockPaperScissorsLizardSpock("rock", "scissors")); // Rock crushes scissors (камень дробит ножницы).
console.log(rockPaperScissorsLizardSpock("paper", "rock")); // Paper smashes scissors (Спок разбивает ножницы).
console.log(rockPaperScissorsLizardSpock("scissors", "lizard")); // Scissors poisons Spock (ящерица отравляет Спока).
console.log(rockPaperScissorsLizardSpock("lizard", "spock")); // Lizard covers rock (бумага покрывает камень).
console.log(rockPaperScissorsLizardSpock("spock", "scissors")); // Spock decapitates lizard (ножницы обезглавливают ящерицу).

/* Описание:

Ваша задача — отсортировать заданную строку. Каждое слово в строке будет содержать одно число. 
Это число — позиция, на которой слово должно находиться в результате.

Примечание: Числа могут быть от 1 до 9. Поэтому первым словом будет 1 (не 0).

Если входная строка пуста, верните пустую строку. Слова во входной строке будут содержать только 
допустимые последовательные числа. 

Примеры:

"is2 Thi1s T4est 3a" --> "Thi1s is2 3a T4est"
"4of For1r pe6ople g3ood th5e the2" --> "Fo1r the2 g3ood 4of th5e pe6ople"
"" --> ""
*/
const order = (words) => {
  if (!words) return "";

  const result = [];
  words.split(" ").forEach((word) => (result[word.split("").sort()[0]] = word));

  return result.filter(Boolean).join(" ");
};

console.log(order("is2 Thi1s T4est 3a"));

/** Описание:

Возможно, вы знаете несколько довольно больших полных квадратов. Но как насчёт СЛЕДУЮЩЕГО?

Завершите метод findNextSquare, который находит следующий полный квадрат после переданного 
в качестве параметра. Напомним, что полный квадрат — это целое число n, такое что sqrt(n) 
также является целым числом.

Если аргумент сам по себе не является полным квадратом, верните либо -1, либо пустое значение, 
например, None или null, в зависимости от используемого языка. Можно считать, что аргумент 
неотрицательный.

Примеры (Ввод -> Вывод)

121 -> 144
625 -> 676
114 -> -1 # потому что 114 не является полным квадратом */

const findNextSquare = (sq) => {
  const sqrt = sq ** 0.5;
  return sqrt === Math.ceil(sqrt) ? (sqrt + 1) ** 2 : -1;
};

console.log(findNextSquare(121));

/** Описание:

Вам будет дан массив целых чисел. Ваша задача — найти в этом массиве индекс N, при котором сумма 
целых чисел слева от N будет равна сумме целых чисел справа от N.

Если индекса, подходящего для этого, нет, верните -1.
Например:

Допустим, вам дан массив {1,2,3,4,3,2,1}:
Ваша функция вернет индекс 3, поскольку сумма левой части индекса ({1,2,3}) 
и сумма правой части индекса ({3,2,1}) равны 6.

Давайте рассмотрим другой пример.
Вам дан массив {1,100,50,-51,1,1}:
Ваша функция вернет индекс 1, поскольку сумма левой части индекса ({1}) 
и сумма правой части индекса ({50,-51,1,1}) равны 1.

Последний пример:
Вам дан массив {20,10,-80,10,10,15,35}
При индексе 0 левая часть равна {}
Правая часть равна {10,-80,10,10,15,35}
При сложении они оба равны 0. (Пустые массивы в этой задаче равны 0.)
Индекс 0 — это положение, где левая и правая части равны.

Примечание: Помните, что в большинстве языков индекс массива начинается с 0.
Входные данные

Массив целых чисел длиной 0 < arr < 1000. Числа в массиве могут быть любыми целыми 
положительными или отрицательными.
Выходные данные

Наименьший индекс N, при котором сторона слева от N равна стороне справа от N. 
Если индекс, соответствующий этим правилам, не найден, будет возвращено значение -1.
Примечание

Если вам дан массив с несколькими ответами, верните наименьший правильный индекс. */

const findEvenIndex = (arr) => {
  const sum = arr.reduce((acc, curr) => acc + curr);
  let left = 0;

  for (let i = 0; i < arr.length; i++) {
    const right = sum - left - arr[i];
    if (left === right) return i;
    left += arr[i];
  }

  return -1;
};

console.log(findEvenIndex([1, 2, 3, 4, 3, 2, 1]));

/** Описание:
Найдите пропущенную букву

Напишите метод, который принимает на вход массив последовательных (возрастающих) букв и возвращает 
пропущенную букву из массива.

Вы всегда получите корректный массив. В нём всегда будет отсутствовать ровно одна буква. 
Длина массива всегда будет не менее 2.
Массив всегда будет содержать буквы только в одном регистре.

Пример:

['a','b','c','d','f'] -> 'e'
['O','Q','R','S'] -> 'P'

(Используйте английский алфавит из 26 букв!)

Удачи в программировании и, пожалуйста, не забудьте проголосовать и оценить это ката! :-)

Я также создал другие ката. Посмотрите, понравилось ли вам это ката! */

const findMissingLetter = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i].charCodeAt(0) + 1 !== array[i + 1].charCodeAt(0)) {
      return String.fromCharCode(array[i].charCodeAt(0) + 1);
    }
  }
  return " ";
};

console.log(findMissingLetter(["a", "b", "c", "d", "f"])); // "e"
