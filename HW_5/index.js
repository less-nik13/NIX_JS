//HW1:
// Дан объект с городами и странами.
// Написать функцию getCity. Эта функция (getCity) должна вернуть новый массив,
// элементы которого будут преобразованы в данный формат: <Столица> - это <Страна>.
// Доступ к объекту может быть любым (через контекст, напрямую и т.д.)
// Можно использовать Object.entries метод )

const citiesAndCountries = {
    Киев: 'Украина',
    'Нью-Йорк': 'США',
    Амстердам: 'Нидерланды',
    Берлин: 'Германия',
    Париж: 'Франция',
    Лиссабон: 'Португалия',
    Вена: 'Австрия',
};

// With Mutation
// function getCity(obj) {
//     return Object.entries(obj).reduce((acc, obj) => {
//         obj.splice(1, 0, '- это');
//         console.log(obj);
//         return [...acc, obj.join(' ')];
//     }, []);
// }

function getCity(obj) {
  return Object.entries(obj).reduce((acc, el) => {
    return [...acc, el.toString().replace(",", " - это ")];
  }, []);
}

const result = getCity(citiesAndCountries); // ['Киев - это Украина', 'Нью-Йорк - это США', ... и т.д.]
console.log(result);

//HW2:
// Cоздать объект с названиями дней недели. Где ключами будут ru и en, a значением свойства ru будет массив с
// названиями дней недели на русском, а en - на английском.
// После написать функцию которая будет выводить в консоль название дня недели пользуясь выше
// созданным объектом (доступ к объекту можно получить напрямую).

// Все дни недели начинаются с 1 и заканичаются цифрой 7 (1- понедельник, 7 - воскресенье).
// Функция принимает в аргументы 2 параметра:
// lang - название языка дня недели
// day - число дня недели

const namesOfDays = {
    ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

function getNameOfDay(lang, datNumber) {
    switch (lang) {
        case 'ru':
            //1st WAY
            datNumber >= 1
                ? console.log(this.ru.find((el, index) => index === datNumber - 1))
                : console.log('Day number must be 1 or high');
            break;
        case 'en':
            //2nd WAY
            for (let i = 0; i < this.en.length; i++) {
                if (datNumber === i) {
                    console.log(this.en[datNumber - 1]);
                }
            }
            break;
        default:
            console.log('Key is not exist');
    }
}
getNameOfDay.call(namesOfDays, 'en', 6);

//HW3:
// Написать универсальную функцию setProto, которая принимает в себя 2 аргумента (currentObj, protoObj).
// Функция должна устанавливать прототип (protoObj) для currentObj. То есть после вызова функции мы должны получить результат:

const person = {
    name: 'Nik',
};

const person1 = {
    age: 21,
};

function setProto(currentObj, protoObj) {
    currentObj.__proto__ = protoObj;
}

setProto(person1, person);
// Теперь прототипом для объекта person1 выступает объект person
console.log(person1);

//HW4:
// Создать базовый объек person. Этот объект должен выступать в роли прототипа для объекта person1.
// В объекте person должны быть такие методы:

// метод для установки имени и возвраста (setName, setAge)
// метод для получения имени и возвраста (getName, getAge)
// метод для валидации возраста (ageValidation)

// Метод ageValidation вызывается при вывозе метода setAge (то есть внутри метода setAge).
// Метод ageValidation должен как-то проверить возраст, который мы вводим в setAge. Если возраст, который мы ввели, меньше 18,
// то записываем в age слово 'Validation Error', а есть введенный возраст больше 18, то вписываем в age это значение.

// ageValidation только проверяет данные, он ничего не записывает (в ageValidation не должно быть this.age = age)

const person2 = {
  setName(name) {
    this.name = name;
  },

  getName() {
    return this.name;
  },

  setAge(age) {
    this.age = this.ageValidation(age);
  },

  getAge() {
    return this.age;
  },

  ageValidation(age) {
    return typeof age === "number" && age >= 18 ? age : "Validation Error";
  }
};

const person3 = {
  __proto__: person2
};

person3.setName("Nikita");
console.log(person3.getName());
person3.setAge("abba");
// person3.setAge(17);
// person3.setAge(18);
console.log(person3);
