const showJoke = (text) => {
	cardText.textContent = text;
};

function getData() {
	loader.style.display = 'block';
	xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			const data = JSON.parse(this.responseText);
			showJoke(data.value);
			loader.style.display = 'none';
		}
	};

	xhr.send();
}

const xhr = new XMLHttpRequest();

const loader = document.querySelector('.card__loading');
const cardText = document.querySelector('.card__text');
const getNewJoke = document.getElementById('next-joke');

getNewJoke.addEventListener('click', getData);
document.addEventListener('DOMContentLoaded', getData);
