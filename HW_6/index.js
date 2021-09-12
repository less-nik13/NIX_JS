//HW1:
// Создать функцию конструктор Animal c аргументами name, age, color. Написать логику для того, чтобы функцию можно было вызывать как с, так и без new:
// При вызове без new новый обьект все равно должен создаться
function Animal(name, age, color) {
    if (!new.target) {
        return new Animal(name, age, color);
    }
    this.name = name;
    this.age = age;
    this.color = color;
}

let cat = Animal('Tom', '5', 'grey');
let mouse = new Animal('Jerry', '5', 'brown');
console.log('First task result (without new): ', cat);
console.log('First task result (with new):', mouse);

//HW2:
// Создайте функцию-конструктор Calculator, который создаёт объекты с такими методами:
// read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
// setAction() запрашивает действие при помощи prompt, которые мы хотим сделать (+, -, / и т.д)
// doAction() выполняет действие, которое юзер ввел (будет вызывать в себя методы sum, mul, min и т.д)
// sum() возвращает сумму введённых свойств.
// mul() возвращает произведение введённых свойств.
// min() возвращает разницу введённых свойств.
// другие методы можете добавит если хотите (метод для квадратного корня и т.д.)

function Calculator() {
    this.read = function () {
        let value1;
        // isNaN from undefined return true
        // prompt возвращает null если пользователь закрыл поле ввода
        while (isNaN(value1) === true || value1 === '' || value1 === null) {
            value1 = prompt('Please, enter first number');
        }

        let value2;
        console.log(value2);
        while (isNaN(value2) === true || value2 === '' || value2 === null) {
            value2 = prompt('Please, enter second number');
        }

        this.val1 = +value1;
        this.val2 = +value2;
    };

    this.setAction = function () {
        let action = prompt('Please enter action (sum, mul, min, div)');

        while (!(action === 'sum' || action === 'mul' || action === 'min' || action === 'div')) {
            action = prompt('Please enter action (sum, mul, min, div)');
        }

        this.action = action;
        alert(this.doAction());
    };

    this.doAction = function () {
        let result;
        switch (this.action) {
            case 'sum':
                result = this.sum();
                break;
            case 'mul':
                result = this.mul();
                break;
            case 'min':
                result = this.min();
                break;
            case 'div':
                result = this.div();
                break;
            default:
                result = 'Command is not exist';
        }
        return result;
    };

    this.sum = function () {
        return this.val1 + this.val2;
    };

    this.mul = function () {
        return this.val1 * this.val2;
    };

    this.min = function () {
        return this.val1 - this.val2;
    };

    this.div = function () {
        return this.val1 / this.val2;
    };
}

let calc = new Calculator();
calc.read();
calc.setAction();
console.log('Second task result: ', calc.doAction());

//HW3:
// Создать функцию конструктор Nums, которая принимает бесконечное множество аргументов, и они записываются в свойство args в виде массива
// Добавить в прототип для всех объектов, которые создадим от конструктора Nums, 2 метода:
// метод getSum должен вернуть сумму всех элементов (которые только целые числа) массива args
// метод myFilterReverse должен отфильтровать массив и оставить только целые числа и развернуть массив (было [1, 2, 3] -> стало [3, 2, 1])
// Метод .reverse использовать нельзя :)
// только целые числа -> Number.isInteger(1); // true Number.IsInteger(1.2); // false

function Nums() {
    this.args = [...arguments];
}

Nums.prototype.getSum = function () {
    return this.args.filter((el) => Number.isInteger(el)).reduce((acc, el) => acc + el, 0);
};

Nums.prototype.myFilterReverse = function () {
    return this.args
        .filter((el) => Number.isInteger(el))
        .reduceRight((acc, el) => {
            acc.push(el);
            return acc;
        }, []);
};

let obj = new Nums(1, 2, 5, 7, 67, 86, 35.5);

console.log('Nums: ', obj.args);
console.log('Third task result (getSum): ', obj.getSum());
console.log('Third task result (myFilterReverse): ', obj.myFilterReverse());

//HW4:
// Есть массив [1, 1, 2, 2, 3]
// Создать свой метод getUnique для любых массивов, который отфильтрует массив и оставит в нем только уникальные значения
// Подсказка: чтобы было легче почитайте про метод .includes()

const arr = [1, 1, 2, 2, 3];

Array.prototype.getUnique = function () {
    return this.filter((el, idx) => !this.includes(el, idx + 1)); //includes ищет совпадения с индекса переданного элемента + 1, трансформирует в falsy-значения, пока не остануться только уникальные значения
};

const newArr = arr.getUnique(); //  [1, 2, 3]
console.log('Fourth task result: ', newArr);

//HW5*:
// Есть объект {a: 1, b: 2, c: 3, d: false, e: 0}; Нужно создать 2 метода для любых объектов:
// метод getKeySum, который найдет сумму значений всех ключей, которые true.
// метод reversKey который поменяет местави key и value (ключ и значение)
// Пример Был объект {a: 1, b: 2}.reversKey() -> стало {1: 'b', 2: 'a'}

let object1 = { a: 1, b: 2, c: 3, d: false, e: 0, 5: true, 12: true, 15: true };
Object.prototype.getKeySum = function () {
    return Object.entries(this)
        .filter((el) => isNaN(el[0]) === false && el[1] === true)
        .reduce((acc, el) => {
            console.log(el);
            acc += +el[0];
            return acc;
        }, 0);
};

Object.prototype.reversKey = function () {
    return Object.fromEntries(Object.entries(this).map((el) => el.reverse()));
};

console.log('Fifth task object: ', object1);
console.log('Fifth task result: ', object1.getKeySum());
console.log('Fifth task result: ', object1.reversKey());
