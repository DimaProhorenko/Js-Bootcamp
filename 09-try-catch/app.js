// try {
// 	console.log(x);
// } catch (error) {
// 	console.log(error);
// }

// const double = (num) => {
// 	if (isNaN(num)) {
// 		throw new Error('Not a number');
// 	}

// 	return num * num;
// };

// try {
// 	console.log(double('2 s'));
// } catch (err) {
// 	console.log(err);
// }

const getData = async () => {
	try {
		const response = fetch('http://httpstat.us/404');
		if (!response.ok) {
			throw new Error('Not found');
		}
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

getData();
