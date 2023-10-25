const getUser = new Promise((resolve, reject) => {
	let error = true;

	if (!error) {
		resolve({ name: 'Brad', age: 30 });
	} else {
		reject('Error - something went wrong');
	}
});

getUser
	.then(({ name, age }) => {
		console.log(`${name} is ${age} years old`);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		console.log('The promise has been resolved or rejected');
	});
