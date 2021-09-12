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

const numbers = [...items].filter((el) => Number(el.innerText)).map((el) => Number(el.innerText)); // Вытягиваем из li числовые значения

btn.addEventListener('click', function (e) {
    input.value = numbers.join(' + ') + ' = ' + numbers.reduce((acc, el) => acc + el);;
});
