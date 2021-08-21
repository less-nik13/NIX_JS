// HW1:
// Если в переменную вписана строка , то выводим в консоль сообщение "Привет, ЗНАЧНИЕ_NAME"
//Если в переменную вписана не строка, а любой другой тип данных, то выводим сообщение "Ошибка, не тот тип данных"

const name = 'Nick';
// const name = 1;

if (typeof name === 'string') {
    console.log(`Hello ${name} \n`);
} else {
    console.log('Type of name is not string \n');
}

//HW2:
// Вывести в консоль примеры всех типов данных
console.log(typeof 1);
console.log(typeof '1');
console.log(typeof 123n);
console.log(typeof Symbol('1'));
console.log(typeof true);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof {});
