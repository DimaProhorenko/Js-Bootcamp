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
		title: show.name,
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

const setImageSrc = (img, path) => {
	const url = 'https://image.tmdb.org/t/p/w500/';
	const fullUrl = path ? `${url}${path}` : './images/no-image.jpg';
	img.setAttribute('src', fullUrl);
};

// Movies

const createMovieCard = (movie) => {
	const cardDiv = document.createElement('div');
	cardDiv.className = 'card';

	const cardLink = document.createElement('a');
	cardLink.setAttribute('href', `./movie-details.html?id=${movie.id}`);

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

const getMovieDetails = async () => {
	const searchParams = new URLSearchParams(window.location.search);
	const movieId = searchParams.get('id');
	const movie = await fetchAPIData(`movie/${movieId}`, false);
	return movie;
};

const displayMovieDetails = async () => {
	const movie = await getMovieDetails();

	console.log(movie);

	const title = document.querySelector('.details-top h2');
	title.textContent = movie.title;

	const stars = document.querySelector('#star');
	stars.textContent = Math.floor(movie.vote_average);

	const releaseDate = document.querySelector('#release-date');
	releaseDate.textContent = movie.release_date;

	const description = document.querySelector('#description');
	description.textContent = movie.overview;

	const img = document.querySelector('#img');
	img.setAttribute('alt', movie.title);
	setImageSrc(img, movie.poster_path);

	const budgetEl = document.querySelector('#budget');
	budgetEl.textContent = movie.budget.toLocaleString('en-US');

	const revenueEl = document.querySelector('#revenue');
	revenueEl.textContent = movie.revenue.toLocaleString('en-US');

	const runTimeEl = document.querySelector('#runtime');
	runTimeEl.textContent = movie.runtime;

	const statusEl = document.querySelector('#status');
	statusEl.textContent = movie.status;
};

const fetchAPIData = async (endpoint, customURL = false) => {
	const API_KEY = 'a2cb3b0b44c96a3a6377f4075e0d9718';
	const API_URL = 'https://api.themoviedb.org/3/';
	let url = '';

	if (customURL) {
		url = `${API_URL}${endpoint}`;
	} else {
		url = `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;
	}
	console.log(url);
	showSpinner();

	// const url = `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;
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
			displayMovieDetails();
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
