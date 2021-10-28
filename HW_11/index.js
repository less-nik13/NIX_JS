// HW1:
// Установите куку с вашем именем и вашим возрастом. Выведите на экран содержимое этих двух кук. (для работы с куками нужен локальный сервер. Мы можете просто установить плагин для VS Code, который называется Live Server (by Ritwick Dey). После установки в правом нижнем углу (в VS Code) будет кнопка "go live". Нажимаем ее и наш сервер запускается)

document.cookie = "name=Nikita; max-age=300";
document.cookie = "age=21; max-age=300";

console.log(document.cookie);

// HW2:
// При заходе на страницу спросите с помощью инпута день рождения пользователя. Когда он зайдет в следующий раз (после перезагрузки и т.д.) - напишите сколько месяцев, дней, часов, минут и секунд осталось до его дня рождения.

const birthdayBlock = document.getElementById('birthday');
const countdownBlock = document.getElementById('countdown');
const input = document.getElementById('birthday__date');
const countdownDays = document.getElementById('countdown__days');
const countdownHours = document.getElementById('countdown__hours');
const countdownMinutes = document.getElementById('countdown__minutes');
const countdownSeconds = document.getElementById('countdown__seconds');

let interval = null;

const start = () => {
    const date = getCookie('birthday');

    if(!date) {
        birthdayBlock.setAttribute('class', 'active');
        input.addEventListener('blur', setCookie);
    } else {
        countdownBlock.setAttribute('class', 'active');
        interval = setInterval(() => {
            startCountdown(date);
        }, 1000);
    }
};

const getCookie = (key) => {
    const matches = document.cookie.match(new RegExp(key.replace(/([.$?*+\\\/{}|()\[\]^])/g, '\\$1') + '=(.*?)(?:;|$)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = ({ target }) => {
    const date = target.value;

    if(!date) {
        return;
    }

    document.cookie = `birthday=${date}; max-age=300`;
    countdownBlock.setAttribute('class', 'active');
    birthdayBlock.setAttribute('class', 'invisible');
    interval = setInterval(() => {
        startCountdown(date);
    }, 1000);
};

const startCountdown = (birthday) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthdayDate = new Date(birthday);
    const birthdayDay = birthdayDate.getDate();
    const birthdayMonth = birthdayDate.getMonth();

    let countdownEnd = new Date(currentYear, birthdayMonth, birthdayDay);

    if(countdownEnd - currentDate < 0) {
        countdownEnd = new Date(currentYear + 1, birthdayMonth, birthdayDay);
    }

    const secondsToBirthday = new Date(countdownEnd - currentDate) / 1000; // convert ms to s
    const days = Math.floor(secondsToBirthday / 3600 / 24);
    const hours = Math.floor(secondsToBirthday / 3600) % 24;
    const minutes = Math.floor(secondsToBirthday / 60) % 60;
    const seconds = Math.floor(secondsToBirthday) % 60;

    countdownDays.innerText = days;
    countdownHours.innerText = hours;
    countdownMinutes.innerText = minutes;
    countdownSeconds.innerText = seconds;
};

start();

// HW3:
// Дан textarea. В него вводится текст. Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в текстареа. Текст должен запоминаться в локальном хранилище.

const textarea = document.getElementById('textarea');
const textareaFromStorage = localStorage.getItem('value');

if(textareaFromStorage) {
    textarea.value = textareaFromStorage;
}

const handleInput = () => {
    localStorage.setItem('value', textarea.value.trim());
};

textarea.addEventListener('input', handleInput);

// HW4:
// Дан массив [1, 2, 3, 4, 5]. Используя splice сделайте из него массив [1, 'a', 'b', 2, 3, 4, 'c', 5, 'e'].

const array = [ 1, 2, 3, 4, 5 ];
array.splice(1, 0, 'a', 'b');
array.splice(6, 0, 'c');
array.splice(8, 0, 'e');

console.log(array);
