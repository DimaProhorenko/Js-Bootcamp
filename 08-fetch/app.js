fetch('./movies.json')
	.then((res) => {
		if (res.ok) {
			return res.json();
		}
	})
	.then((data) => {
		console.log(data);
	});

fetch('https://api.github.com/users')
	.then((res) => res.json())
	.then((data) => console.log(data));
