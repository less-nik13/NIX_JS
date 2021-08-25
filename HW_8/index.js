//HW1:
// Создайте элемент 'p', при клике на котором появляется картинка размером 100px
// При наведении указателя мышки на картинку ее размер должен плавно увеличиваться до 200px
// При клике на картинке она должна исчезать

let parentDiv = document.querySelector('.task-1');

let p = document.createElement('p');
let image = document.createElement('img');
image.setAttribute('src', 't1.jpg');
image.setAttribute('alt', 'Car Image');
image.setAttribute(
    'style',
    `width: 100px;
    display: none;
    transition: width 1s ease`,
);

p.innerText = 'CLICK ME';
parentDiv.append(p);
parentDiv.append(image);

p.addEventListener('click', function (e) {
    image.style.display = 'block';
});

image.addEventListener('mouseover', function (e) {
    this.style.width = '200px';
});

image.addEventListener('click', function (e) {
    this.style.display = 'none';
    this.style.width = '100px';
});

//HW2:
// Дан массив с числами.
// Найдите сумму последних N элементов до первого нуля с конца.
// Пример: [1, 2, 3, 0, 4, 5, 6] - суммируем последние 3 элемента, так как дальше стоит элемент с числом 0.

const array = [1, 2, 3, 0, 4, 0, 5, 6, 14];
const result = array.reduceRight((acc, el, index) => {
    return index > array.lastIndexOf(0) ? acc + el : acc;
}, 0);
console.log('Second task result: ', result);

//HW3:
// Дан массив с числами. Узнайте сколько элементов с начала массива надо сложить, чтобы в сумме получилось больше 10-ти.
const arr = [1, 2, 3, 0, 4, 0, 5, 6, 4, 8, 10];
let elems = 1;
const res = arr.reduce((acc, el) => {
    if (acc > 10) {
        console.log('Third task result: ', elems);
        return acc;
    } else {
        elems++;
        return acc + el;
    }
});

//HW4:
// Есть инпут, в который что-то вводим. Рядом с инпутом есть кнопка. По нажатию на кнопку выводим в консоль то, что вписали в инпут.
const button = document.getElementById('button');
const input = document.getElementById('input');

button.addEventListener('click', (e) => {
    console.log(input.value);
});

//HW5:
// Привяжите всем ссылкам в документе событие - по наведению на ссылку в конец ее текста дописывается ее href в круглых скобках.
let anchors = document.querySelectorAll('a');
[...anchors].map((anchor) =>
    anchor.addEventListener('mouseover', function (e) {
        anchor.innerText = e.target.innerText + `(href = ${this.getAttribute('href')})`;
    }),
);

//HW6:
// Добавьте JavaScript к кнопке button, чтобы при нажатии элемент исчезал.
const btn = document.getElementById('task-6-btn');
const p6 = document.getElementById('paragraph');

btn.addEventListener('click', (e) => {
    p6.classList.toggle('hide');
});

//HW7:
// Логика:
// Сделать валидацию для инпута. Нужно проверять то, что вводим в инпут.
// Вводить можно только тип данных number. Если юзер ввел букву, то удаляем все (все что ввели) в инпуте
// В инпут юзер вводит кол-во пикселей, на которое хотим передвинуть круг (по Х координате)
// При нажатии на кнопку START получаем данные из инпута (какое-то число) и передвигаем наш круг на то кол-во пикселей, которое ввел юзер в инпут
// Передвижения круга должно быть с анимацией
// Если юзер ввел число больше 600px || меньше нуля, то напрямую пишем в инпут ERROR (понимаем это после нажатия на кнопку)

const btn7 = document.getElementById('task-7-btn');
const input7 = document.getElementById('pixels');
const circle = document.getElementById('circle');

btn7.addEventListener('click', (e) => {
    const getPixels = +input7.value;
    if (typeof getPixels === 'number' && getPixels >= 0 && getPixels <= 600) {
        circle.animate(
            [
                { backgroundColor: 'rgb(248, 66, 66)' },
                { backgroundColor: 'yellow' },
                { backgroundColor: 'blue' },
                { backgroundColor: 'green' },
            ],
            {
                duration: 1500,
            },
        );
        circle.style.transform = `translateX(${getPixels}px)`;
    } else if (getPixels < 0 || getPixels >= 600) {
        input7.value = 'ERROR';
    } else {
        input7.value = '';
    }
});
