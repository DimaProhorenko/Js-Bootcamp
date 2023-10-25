const createLi = (repo) => {
	const li = document.createElement('li');
	const p = document.createElement('p');
	p.textContent = `${repo.name} -- ${repo.url}`;
	li.appendChild(p);
	return li;
};

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.github.com/users/DimaProhorenko/repos');

xhr.onreadystatechange = function () {
	if (this.readyState === 4 && this.status === 200) {
		const data = JSON.parse(this.responseText);
		data.forEach((movie) => {
			result.appendChild(createLi(movie));
		});
	}
};

xhr.send();

const ul = document.getElementById('result');
