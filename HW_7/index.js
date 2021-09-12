//HW1:
// Создать функцию которая будет удалять людей из массива по индексу, который мы передадим параметром.

const arr = ['Vasya', 'Petya', 'Alexey'];

//1st WAY: исходный массив не мутируется
// function removeUser(arr, index) {
//     return arr.filter((el, idx) => idx != index);
// }

// 2nd WAY: исходный массив мутируется
function removeUser(arr, indx) {
    const isExistsIndex = arr.findIndex((el, idx) => idx === indx);
    console.log(isExistsIndex);
    if (isExistsIndex > -1) {
        arr.splice(isExistsIndex, 1); // Возвращает удалённый элемент или undefined
    } else {
        return arr;
    }
}
console.log(removeUser(arr, 1));
console.log('First task result: ', arr); /// ['Vasya', 'Alexey']

//HW2:
// Повторите по данному по образцу (используя JS):
// Родительский div можно добавить просто в html файле

let parentDiv = document.getElementById('blocks');
let childrenItem1 = document.createElement('div');
let childrenItem2 = document.createElement('div');
let childrenItem3 = document.createElement('div');

childrenItem1.classList.add('square');
childrenItem2.classList.add('square');
childrenItem3.classList.add('square');

childrenItem1.setAttribute(
    'style',
    `margin: 0 auto; width: 100px; height: 100px; background-color: #7e8aeb;`,
);

childrenItem2.setAttribute(
    'style',
    `position: relative;
    width: 100px;
    height: 100px;
    background-color: #ff8888;
    -webkit-transform: translate(-60px, -60px);
    transform: translate(-60px, 40px);
    z-index: -1;`,
);

childrenItem3.setAttribute(
    'style',
    `position: relative;
    width: 100px;
    height: 100px;
    background-color: #4def99;
    -webkit-transform: translate(60px, -40px);
    transform: translate(60px, -40px);
    z-index: -1;`,
);

parentDiv.append(childrenItem1);
parentDiv.append(childrenItem3);
parentDiv.prepend(childrenItem2);

//HW3:
// У вас есть следующий код:
// Используя JS, добавить такие блоки в div с классом holder
// С помощью стилей привести блоки в такой вид (в стилях только флекс)

let holder = document.querySelector('.holder');

let item1 = document.createElement('div');
let item2 = document.createElement('div');
let item3 = document.createElement('div');
let item4 = document.createElement('div');
let item5 = document.createElement('div');

item1.classList.add('item');
item2.classList.add('item');
item3.classList.add('item');
item4.classList.add('item');
item5.classList.add('item');

item1.innerText = '1';
item2.innerText = '2';
item3.innerText = '3';
item4.innerText = '4';
item5.innerText = '5';

holder.append(item1);
holder.append(item2);
holder.append(item3);
holder.append(item4);
holder.append(item5);

//HW4:
//Напилить код функции modificator, такой, чтобы в результате работы кода была строка "sampleFunc: test | sample"

function sampleFunc() {
    return `${arguments.callee.name}: ${arguments[0]} | ${arguments[1]}`; //arguments.callee ссылается на функцию которая выполняется в данный момент
}

function modificator(func) {
    return func('test', 'sample');
}

const testFunc = modificator(sampleFunc);

console.log('Fourth task result: ', testFunc); // sampleFunc: test | sample

//HW5:
// Создать массив group, элементы которого будут объектами, содержащими данные каждого студента группы
// Какие данные - на ваше усмотрение ( например, имя, фамилия, возраст, наличие ноутбука и т.д. )
// Создать функцию, которая итерирует массив group, выводя в консоль данные каждого студента одной строкой
// ( предварительно преобразовав объект в строку, не забудьте сивол-разделитель )

const group = [
    {
        name: 'Alex',
        lastName: 'Pupkin',
        age: 21,
        notebook: true,
    },
    {
        name: 'Masha',
        lastName: 'Pupkina',
        age: 25,
        notebook: false,
    },
    {
        name: 'Victor',
        lastName: 'Pupkin',
        age: 30,
        notebook: true,
    },
];

//1st WAY
function getStudentsList(arrayOfStudents) {
    arrayOfStudents.forEach((item) => {
        item.toString = function () {
            return `name - ${this.name}, lastName - ${this.lastName}, age - ${this.age}, notebook - ${this.notebook}`;
        };
        console.log(item.toString());
    });
}

getStudentsList(group);

//2nd WAY
// function getStudentsList(arrayOfStudents) {
//     arrayOfStudents.forEach((el) =>
//         console.log(
//             Object.entries(el)
//                 .filter((el) => typeof el[1] !== 'function' && typeof el[1] !== 'object')
//                 .map((item) => item.join(' - '))
//                 .join(', '),
//         ),
//     );
// }
// getStudentsList(group);
