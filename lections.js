const chars = ['a', 'b'];

const users = [
    { name: 'Johna', age: 28 },
    { name: 'Nick', age: 29 },
    { name: 'Baba', age: 23 },
];
// const maxAge = users.reduce((acc, user) => {
//     return acc.age > user.age ? acc.age : user.age;
// });

const symbolsAtName = users.reduce((acc, user) => {
    const finder = chars.find((el) => user.name.includes(el));
    return finder ? [...acc, user.name] : [...acc];
}, []);
console.log(symbolsAtName);
