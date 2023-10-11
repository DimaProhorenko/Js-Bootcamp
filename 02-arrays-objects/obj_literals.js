// const p = {
// 	name: 'John Doe',
// 	age: 43,
// 	isAdmin: true,
// 	address: {
// 		street: '123 Main street',
// 		city: 'Boston',
// 		state: 'MA',
// 	},
// 	hobbies: ['music', 'sports'],
// };

// let x;

// x = p.name;

// x = p['age'];

// x = p.address.city;

// x = p.hobbies;

// delete p.age;

// x = p;

// p.greet = function () {
// 	return `Hello, my name is ${this.name}`;
// };

// console.log(x.greet());

// const obj1 = {
// 	a: 1,
// 	b: 2,
// 	c: 3,
// };

// const obj2 = {
// 	c: 5,
// 	d: 6,
// 	e: 8,
// };

// const c = { ...obj1, ...obj2 };

// const n = Object.assign({}, obj1, obj2);

// console.log(Object.keys(p));

const firstName = 'John';
const lastName = 'Doe';
const age = 30;

const person = { firstName, lastName, age };

console.log(person);

// Destructuring

const todo = {
	id: 1,
	title: 'Take out trash',
	user: {
		name: 'John',
	},
};

const {
	id: todoId,
	title: todoTitle,
	user: { name: userName },
} = todo;

// console.log(todoId, todoTitle, userName);

const nums = [23, 55, 64, 32];

const [first, second, ...restNums] = nums;

console.log(first, second, restNums);
