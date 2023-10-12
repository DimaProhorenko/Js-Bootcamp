function sayHello() {
	console.log('Hello world');
}

function registerUser(user = 'Bot') {
	return user + ' registered';
}

function sum(...nums) {
	return nums.reduce((item, sum) => {
		return sum + item;
	}, 0);
}

// console.log(sum(1, 2, 3));

function loginUser(user) {
	return `${user.name} with the id ${user.id} is logged in`;
}

const user = {
	name: 'Dima',
	id: 758493958,
};

// console.log(loginUser(user));

function first() {
	const x = 100;

	function second() {
		const y = 200;
		console.log(x + y);
	}

	return second;
}

// first()();

function add(a, b) {
	return a + b;
}

const addOne = (a) => a + 1;

const createUser = (name, age) => ({
	name,
	age,
});

console.log(createUser('Dima', 23));
