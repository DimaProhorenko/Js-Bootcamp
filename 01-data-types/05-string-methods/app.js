let x;

const name = 'John';
const age = 22;

x = `Hello my name is ${name} and I'm ${age} years old`;

const s = 'Hello World';

x = s.length;
x = s[0];
x = s.__proto__;
x = s.toUpperCase();
x = s.toLowerCase();
x = s.indexOf('e');
x = s.substring(0, 4);
x = s.slice(-1);
x = s.replace('World', 'John');
x = s.includes('Hel');
x = s.split('');

const str = 'developer';
const cap = str.charAt(0).toUpperCase() + str.slice(1);

console.log(cap);
