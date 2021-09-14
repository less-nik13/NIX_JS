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
