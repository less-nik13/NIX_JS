//HW1:
// Написать функцию bindFunc, которая принимает в себя 2 + аргументов (Точно должна принять 2 аргумента, а дальше сколько угодно).
// 1 аргумент - какая-то функция
// 2 аргумент - значение контекста
// 3 + ... аргументы - любое кол-во аргументов
// Эта функция, должна устанавливать контекст для функции, которая в первом аргументе, и возвращать эту функцию с новым контекстом.
// Сам контекст, который мы хотим установить, находиться во втором аргументе

function bindFunc(fn, context, ...args) {
    return fn.apply(context, [...args]);
}

let object1 = {
    name: 'myObject',
};

function printNameAndArgs() {
    return `${this.name}, ${[...arguments]}`;
}
console.log('First task result: ', bindFunc(printNameAndArgs, object1, '1', '2', '3'));

//HW2:
// Написать функцию, которая не принимает никаких аргументов. В теле функции написать логику для нахождения
// суммы значений любого количества ключей (значения ключей должны быть больше нуля) из переданного контекста.
// Обращаться к objectA напрямую нельзя :)

const objectA = {
    a: 1,
    b: 2,
    c: 3,
    d: 10,
    e: 14,
    f: -5,
};

function func() {
    //1st WAY
    // let result = 0;
    // for (let key in this) {
    //     if (this[key] > 0) {
    //         result += this[key];
    //     }
    // }
    // return result;

    //2nd WAY
    return Object.values(this)
        .filter((el) => el > 0)
        .reduce((acc, el) => acc + el, 0);
}
console.log('Second task result: ', func.call(objectA));

//HW3:
// Написать функцию, которая возвращает новый массив, в котором должны быть только четные числа, которые больше двуx и меньше 10.
// Новый массив будет состоять из значений ключа values из контекста, если такого ключа нет, то выводим сообщение "Не найдено".
// Обращаться к valObject0 напрямую нельзя :)

function getNewArray() {
    if (Object.keys(valObject0).includes('values')) {
        return this.values.filter(
            (el) => typeof el === 'number' && el % 2 === 0 && el > 2 && el < 10,
        );
    } else {
        return 'Can`t find key "values"';
    }
}

const valObject0 = {
    values: [1, '2', 4, 8, '8', 3, 10, null, false],
};
console.log('Third task result: ', getNewArray.call(valObject0));
