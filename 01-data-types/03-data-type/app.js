// Strings
const firstName = 'Sarah';

// Number
const n1 = 12.5;

// Boolean
const isYoung = true;

// Null
const apartmentNumber = null;

// Undefined
let score;

// Symbol
const id = Symbol('id');

// BigInt
const large = 9054385098406986n;

// Reference Types
const nums = [1, 2, 3, 4, 5];

const person = {
	name: 'Dima',
	age: 23,
};

function sayHello() {
	console.log('Hello');
}

const say = () => {
	console.log('hello');
};

const output = say;

console.log(output, typeof output);
