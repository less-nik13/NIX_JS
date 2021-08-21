// HW1:
// Получить от юзера число.
// Получить сумму квадаров всех чисел от 1 до числа, которое ввел юзер.

//Взаимодействие с пользователем в браузере
// const userNumber = prompt('Enter number', 1);
// function sumSquare(n) {
//     let result = 0;
//     for (let i = 1; i <= n; i++) {
//         result += i ** 2;
//     }
//     return result;
// }
// alert(`First task result: ${sumSquare(userNumber)}`);

//Для запуска в ноде
function sumSquare(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i ** 2;
    }
    return result;
}
console.log('First task result: ' + sumSquare(4));

//------------------------------------------------------------------------------------------------------------------------------------
// HW2:
// Есть массив [3, 5, 12, 9, 23, 93, 17]
// Отфильтровать его так, чтобы остались только те числа, которые больше 2 и меньше 20. И потом получить их сумму.

let arr = [3, 5, 12, 9, 23, 93, 17];
let result = arr.filter((el) => el > 2 && el < 20).reduce((acc, el) => acc + el);
console.log('Second task result: ' + result);

//------------------------------------------------------------------------------------------------------------------------------------
//HW3:
// Дан массив [[1, 6, 3, '6'], [10, 15, 13, '10']]. Найти сумму элементов, которые являются числами и которые кратны двум
let array = [
    [1, 6, 3, '6'],
    [10, 15, 13, '10'],
];

//#1st WAY
let resultSum = array
    .flat()
    .filter((el) => typeof el === 'number' && el % 2 === 0)
    .reduce((acc, el) => acc + el, 0);
console.log('Third task result: ' + resultSum);

// //#2nd WAY
// const flatArray = (arr) => {
//     return arr.reduce((acc, el) => {
//         return Array.isArray(el) ? [...acc, ...flatArray(el)] : [...acc, el];
//     }, []);
// };

// const sumEvenNumbers = (arr, cb) => {
//     return cb(arr)
//         .filter((el) => typeof el === 'number' && el % 2 === 0)
//         .reduce((acc, el) => acc + el, 0);
// };
// console.log('Third task result: ' + sumEvenNumbers(array, flatArray));

//------------------------------------------------------------------------------------------------------------------------------------
//HW4:
// Написать функцию, которая устанавливает новые свойства в объект.
// Функция принимает в себя 3 аргумента - key, value, obj
// key - свойство, которое хотим добавить. Принимаем это от юзера.
// value - значение свойства. Принимаем это от юзера.
// obj - объект, в который хотим добавить новое свойство.
// Если юзер ввел ключ, который уже есть в объекте, то выводим сообщение - "Уже есть", если ключа нет, то устанавливаем его в объект.

// #1st WAY
// const addPropertyToObj = (key, value, obj) => {
//     return obj.hasOwnProperty(key) ? 'Key already exists' : { ...obj, [key]: value };
// };

//#2nd WAY
const addPropertyToObj = (key, value, obj) => {
    return Object.keys(obj).includes(key)
        ? 'Key already exists'
        : Object.assign({}, obj, { [key]: value });
};

const object = {
    name: 'Nick',
    age: 21,
};

let newObj = addPropertyToObj('сountry', 'Ukraine', object);
console.log('Fourth task result: ', newObj);
