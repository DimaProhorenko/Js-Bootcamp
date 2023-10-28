const router = {
	fullPath: window.location.pathname.split('/'),
	getCurrentPage: function () {
		return this.fullPath[this.fullPath.length - 1];
	},
};

const createItemFromMovie = (movie) => {
	return {
		title: movie.title,
		release_date: movie.release_date,
		poster_path: movie.poster_path,
		id: movie.id,
	};
};

const createItemFromShow = (show) => {
	return {
		title: show.original_name,
		release_date: show.first_air_date,
		poster_path: show.poster_path,
		id: show.id,
	};
};

const highlightActiveLink = () => {
	const links = document.querySelectorAll('.nav-link');
	console.log(router.getCurrentPage());
	links.forEach((link) => {
		if (link.getAttribute('href') === './' + router.getCurrentPage()) {
			link.classList.add('text-primary');
		}
	});
};

const showSpinner = () => {
	const spinner = document.querySelector('.spinner');
	spinner.style.display = 'block';
};

const hideSpinner = () => {
	const spinner = document.querySelector('.spinner');
	spinner.style.display = 'none';
};

// Movies

const createMovieCard = (movie) => {
	const cardDiv = document.createElement('div');
	cardDiv.className = 'card';

	const cardLink = document.createElement('a');
	cardLink.setAttribute('href', `./movie-details.html?${movie.id}`);

	const cardImg = document.createElement('img');
	cardImg.setAttribute(
		'src',
		`https://image.tmdb.org/t/p/w500/${movie.poster_path}`
	);
	cardImg.setAttribute('alt', movie.title);
	cardImg.className = 'card-img-top';

	const cardBody = document.createElement('div');
	cardBody.className = 'card-body';

	const cardTitle = document.createElement('h5');
	cardTitle.className = 'card-title';
	cardTitle.textContent = movie.title;

	const cardText = document.createElement('p');
	cardText.className = 'card-text';

	const cardSmall = document.createElement('small');
	cardSmall.className = 'text-muted';
	cardSmall.textContent = `Released: ${movie.release_date}`;

	cardText.appendChild(cardSmall);
	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardText);
	cardLink.appendChild(cardImg);
	cardDiv.appendChild(cardLink);
	cardDiv.appendChild(cardBody);

	return cardDiv;
};

const displayPopularMovies = async () => {
	const { results: movies } = await fetchAPIData('movie/popular');
	console.log(movies);
	const popularMovies = document.getElementById('popular-movies');
	movies.forEach((movie) => {
		const movieCard = createMovieCard(createItemFromMovie(movie));
		popularMovies.appendChild(movieCard);
	});
};

// TV Series
const displayPopularTvSeries = async () => {
	const { results: tv } = await fetchAPIData('tv/popular');
	console.log(tv);
	const popularSeries = document.getElementById('popular-shows');
	tv.forEach((series) => {
		const seriesCard = createMovieCard(createItemFromShow(series));
		popularSeries.appendChild(seriesCard);
	});
};

const fetchAPIData = async (endpoint) => {
	const API_KEY = 'a2cb3b0b44c96a3a6377f4075e0d9718';
	const API_URL = 'https://api.themoviedb.org/3/';
	showSpinner();

	const url = `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;
	const repsonse = await fetch(url);
	const data = await repsonse.json();
	hideSpinner();
	return data;
};

// Init App
function init() {
	switch (router.getCurrentPage()) {
		case '/':
			console.log('Home');
			showSpinner();
			displayPopularMovies();
			hideSpinner();
			break;
		case 'index.html':
			console.log('Home');
			displayPopularMovies();
			break;
		case 'shows.html':
			console.log('Shows');
			displayPopularTvSeries();
			break;
		case 'movie-details.html':
			console.log('Details');
			break;
		case 'tv-details.html':
			console.log('TV Details');
			break;
		case 'search.html':
			console.log('Search');
			break;
	}
	highlightActiveLink();
}

init();
