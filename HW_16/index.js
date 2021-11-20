//HW_1:
// Создать фабрику ITCompany и базовый класс Human (его наследуем для каждого работника)
// фабрика ITCompany
// Эта фабрика (ITCompany) будет создавать нам работников IT компании. У каждого работника есть имя, возраст и должность.
//
// У нас есть 2 должности - Программист и Тестер
// В фабрике ITCompany должен быть 1 метод для создания работников. Метод называется create, принимает в себя все, что нужно для созданиям работника.
//
// Базовый класс Human
// В этом классе должен быть статический метод getType, который возвращает строку 'Человек'
// В этом классе (Human) будут 2 свойства в конструкторе - name и age
// Потом должно быть еще 2 метода (уже не в конструкторе) - getName и getAge. В них мы получаем имя и возраст
// Дальше
// Потом нам нужны еще 2 класса под каждую должность - Programmer и Tester
// Они наследуются от Human
// В конструкторы этих классов мы должны добавить еще одно поле job. Для Programmer job = 'Programmer', для Test job = 'Tester'
// В прототипы для объектов, которые создадим от этих классов (от Programmer и Tester) мы добавляем метод для получения их имени
// В каждом классе должен быть статический метод, который выводит job.

const positions = Object.freeze({
    PROGRAMMER: "PROGRAMMER",
    TESTER: "TESTER"
});

class Human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    static getType() {
        return "Human";
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }
}

class Programmer extends Human {
    constructor(name, age) {
        super(name, age);
        this.job = "Programmer";
    }

    static getJob() {
        return "Programmer";
    }
}

class Tester extends Human {
    constructor(name, age) {
        super(name, age);
        this.job = "Tester";
    }

    static getJob() {
        return "Tester";
    }
}

class ITCompany {
    static create(position, { name, age }) {
        switch(position) {
            case positions.PROGRAMMER:
                return new Programmer(name, age);
                break;
            case positions.TESTER:
                return new Tester(name, age);
                break;
            default:
                throw new Error("Error: Unknown position");
        }
    }
}

const programmer1 = {
    name: "Nikita",
    age: 21,
};

const tester1 = {
    name: "Ihor",
    age: 21,
};

const newProgrammer = ITCompany.create(positions.PROGRAMMER, programmer1);
const newTester = ITCompany.create(positions.TESTER, tester1);

console.log(newProgrammer);
console.log(Programmer.getJob());
console.log(newTester);
console.log(Tester.getJob());

// HW2:
// Дан объект
// const obj = { a: '1', b: '2', c: '3', e: '4', o: '5' }
// Сделать так, чтобы мы не могли мутировать (менять) те свойства в объекте, ключи которых - гласная буква :)

const obj = {
    a: '1',
    b: '2',
    c: '3',
    e: '4',
    o: '5'
};
const vowels = [ 'a', 'e', 'i', 'o', 'u' ];

for(let key in obj) {
    const isVowel = vowels.some(vowel => vowel === key);

    if(isVowel) {
        Object.defineProperty(obj, key, {
            writable: false
        });
    }
}