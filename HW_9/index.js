//HW1:
// Реализовать Числа Фибоначчи двумя способами (рекурсия и цикл)
// Recursion
function fibonacci(n) {
    if (n < 2) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
const number = 9;
for (let i = 0; i < number; i++) {
    console.log(fibonacci(i));
}
console.log('First task recursion result: ', fibonacci(9));

// Loop
const fib = (n) => {
    if (n < 2) return n;

    let prev = 0;
    let next = 1;
    for (let i = 0; i < n; i++) {
        next = prev + next;
        console.log(prev);
        prev = next - prev;
    }
    return prev;
};
console.log('First task loop result: ', fib(9));

//HW2:
// Рассчитать сумму натуральных чисел до n (2 решения - рекурсия и цикл)
function sumNatural(n) {
    if (n > 0) {
        return n + sumNatural(n - 1);
    } else {
        return n;
    }
}

console.log('Second task recursion result: ', sumNatural(21));

function sumNaturals(n) {
    if (n > 0) {
        let sum = 1;
        for (let i = 2; i <= n; i++) {
            sum += i;
        }
        return sum;
    } else {
        return n;
    }
}
console.log('Second task loop result: ', sumNaturals(21));

//HW3:
// Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.
function printNumbers(from, to) {
    //SetInterval WAY
    let val = from;
    let interval = setInterval(function () {
        if (val == to) {
            clearInterval(interval);
        }
        console.log(val);
        val++;
    }, 1000);

    //Recursion WAY
    // (function f(i) {
    //     if (i > to) return;
    //     setTimeout(function () {
    //         console.log(i);
    //         f(i + 1);
    //     }, 1000);
    // })(from);
}
printNumbers(1, 20);

//HW4:
// Нужно создать интервал, который выводит в консоль количество секунд, прошедших с момента запуска программы.
function interval() {
    let i = 1;
    let interval = setInterval(function () {
        if (i == 5) {
            clearInterval(interval);
        }
        console.log('Прошло ' + i + ' сек');
        i++;
    }, 1000);
}
interval();

//HW5:
// Написать логику, которая будет находить сумму всех ЧИСЕЛ, которые вписаны в li,
// и выводить эту сумму (в формате 1 + 2 + 3 = 6) в инпут (#inp) по нажатию на кнопку (#sum)

const items = document.getElementsByClassName('li');
const input = document.getElementById('inp');
const btn = document.getElementById('sum');

const getNumbers = [];

[...items].filter((el) => Number(el.innerText)).map((el) => getNumbers.push(Number(el.innerText))); // Вытягиваем из li числовые значения и пушим в новый массив

const res = getNumbers.reduce((acc, el) => acc + el);

btn.addEventListener('click', function (e) {
    input.value = getNumbers.join(' + ') + ' = ' + res;
});

//HW6:
// Написать игру "крестики-нолики"
// Игра должна быть на двоих.
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// X
let mark = 'mark';
// O
let circle = 'circle';

let restartButton = document.getElementById('restart');
let turn = document.querySelector('.turn');

// GET ALL CELLS
let cells = document.querySelectorAll('.cell');

let firstPlayerScore = document.querySelector('.player1');
let secondPlayerScore = document.querySelector('.player2');
let drawScore = document.querySelector('.draw');

// VARIABLE FOR CONTROL TURN
let circleTurn;

start();

function start() {
    turn.innerText = 1;
    // INITIALIZE FIRST TURN OF X
    circleTurn = false;

    cells.forEach((cell) => {
        // CLEAN BOARD FROM LAST GAME
        cell.classList.remove('mark');
        cell.classList.remove('circle');
        cell.style.cursor = 'pointer';
        // LISTENER WORKS ONLY 1 TIME ON ELEMENT
        cell.addEventListener('click', cellClick, { once: true });
    });
}

function cellClick(e) {
    // EVERY CLICK ON CELL CHANGE TURN NUMBER
    turn.innerText = +turn.innerText + 1;
    // GET VALUE OF CLICKED ELEM
    let cell = e.target;
    // GET TURN (X OR O)
    const currentTurn = circleTurn ? circle : mark;
    // ADD FOR CELL CLASS BASED ON TURN
    placeMark(cell, currentTurn);
    if (checkWin(currentTurn)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

// НИЧЬЯ ЕСЛИ ВСЕ ЯЧЕЙКИ ЗАНЯТЫ И НЕТ ВЫИГРАШНОЙ КОМБИНАЦИИ
function isDraw() {
    return [...cells].every((cell) => {
        return cell.classList.contains(mark) || cell.classList.contains(circle);
    });
}

function endGame(draw) {
    // IF DRAW ADD +1 TO SCORE OF DRAW SPAN
    if (draw) {
        cells.forEach((cell) => {
            cell.style.cursor = 'not-allowed';
        });

        drawScore.innerText = +drawScore.innerText + 1;
        setTimeout(() => alert('Draw!'), 0);
    } else {
        // DISABLE CLICK ON REMAING CELLS
        cells.forEach((cell) => {
            cell.style.cursor = 'not-allowed';
            cell.removeEventListener('click', cellClick);
        });
        circleTurn
            ? (secondPlayerScore.innerText = +secondPlayerScore.innerText + 1)
            : (firstPlayerScore.innerText = +firstPlayerScore.innerText + 1);
        setTimeout(() => alert(`${circleTurn ? 'O' : 'X'} WIN!`), 0);
    }
}

function checkWin(currentClass) {
    // ПРОХОДИМ ПО МАССИВУ ВЫИГРАШНЫХ КОМБИНАЦИЙ, И ИЩЕМ ОДНО СОВПАДЕНИЕ
    return combinations.some((combination) => {
        // ПРОХОДИМ ПО ЭЛЕМЕНТАМ ВСЕХ МАССИВОВ
        // НАХОДИМ МАССИВ, ЗНАЧЕНИЯ КОТОРОГО === ИНДЕКСАМ
        // И СОДЕРЖАТ ОДИННАКОВЫЙ ТЕКУЩИЙ КЛАСС
        return combination.every((index) => {
            return cells[index].classList.contains(currentClass);
        });
        // ВОВЗРАЩАЕМ TRUE ЕСЛИ НАШЛОСЬ ХОТЯ БЫ ОДНО СОВПАДЕНИЕ
    });
}

// RESTART GAME
restartButton.addEventListener('click', start);
