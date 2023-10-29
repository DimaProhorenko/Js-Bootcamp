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

const createCompanyLogo = (logoPath) => {
	const img = document.createElement('img');
	img.setAttribute('src', logoPath);
	return img;
};

const displayBackDrop = (type, imgPath) => {
	const backdrop = document.createElement('div');
	backdrop.className = 'details-backdrop';
	backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${imgPath}')`;

	if (type === 'movie') {
		document.querySelector('.details-top').appendChild(backdrop);
	}
};

// Movies

const createMovieCard = (movie, type = 'movie') => {
	const cardDiv = document.createElement('div');
	cardDiv.className = 'card';

	const cardLink = document.createElement('a');
	cardLink.setAttribute('href', `./${type}-details.html?id=${movie.id}`);

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
		const seriesCard = createMovieCard(createItemFromShow(series), 'tv');
		popularSeries.appendChild(seriesCard);
	});
};

const getMovieDetails = async () => {
	const searchParams = new URLSearchParams(window.location.search);
	const movieId = searchParams.get('id');
	const movie = await fetchAPIData(`movie/${movieId}`, false);
	return movie;
};

const getTvDetails = async () => {
	const searchParams = new URLSearchParams(window.location.search);
	const tvId = searchParams.get('id');
	const tv = await fetchAPIData(`tv/${tvId}`, false);
	return tv;
};

const displayMovieDetails = async () => {
	const movie = await getMovieDetails();
	const genres = movie.genres.map((el) => el.name);

	console.log(movie);

	displayBackDrop('movie', movie.backdrop_path);

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

	genres.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = item;
		document.querySelector('#genres').appendChild(li);
	});

	if (movie.homepage) {
		document
			.querySelector('#homepage-link')
			.setAttribute('href', movie.homepage);
	}

	movie.production_companies.forEach((company) => {
		const text = document.createTextNode(company.name + ', ');
		document.querySelector('#companies').appendChild(text);
	});
};

const displayTvDetails = async () => {
	const tv = await getTvDetails();
	console.log(tv);

	const title = document.querySelector('#tv-title');
	title.textContent = tv.name;

	const rating = document.querySelector('#tv-rating');
	rating.textContent = Math.floor(tv.vote_average);

	const releaseDate = document.querySelector('#tv-release');
	releaseDate.textContent = tv.first_air_date;

	const overview = document.querySelector('#tv-overview');
	overview.textContent = tv.overview;

	const poster = document.querySelector('#tv-poster');
	setImageSrc(poster, tv.poster_path);

	const genreList = document.querySelector('#tv-genre');
	tv.genres.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = item.name;
		genreList.appendChild(li);
	});

	const homepageLink = document.querySelector('#homepage-link');
	if (tv.homepage) {
		homepageLink.setAttribute('href', tv.homepage);
	} else {
		homepageLink.style.display = 'none';
	}

	const numOfEpisodes = document.querySelector('#num-episodes');
	numOfEpisodes.textContent = tv.number_of_episodes;

	const lastAirEpisode = document.querySelector('#last-air-episode');
	lastAirEpisode.textContent = tv.last_episode_to_air.name;

	const status = document.querySelector('#tv-status');
	status.textContent = tv.status;

	const seasons = document.querySelector('#tv-seasons');
	seasons.textContent = tv.number_of_seasons;
};

const getMovieGenre = async (movieGenres) => {
	const { genres } = await fetchMovieGenres();
	return genres.filter((genre) => {
		return movieGenres.includes(genre.id);
	});
};

const fetchProductionCompany = async (id) => {
	const result = await fetchAPIData(`company/${id}/images`);
	console.log(result);
};

const fetchMovieGenres = async () => await fetchAPIData('genre/movie/list');

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
			showSpinner();
			displayPopularMovies();
			hideSpinner();
			break;
		case 'index.html':
			displayPopularMovies();
			break;
		case 'shows.html':
			displayPopularTvSeries();
			break;
		case 'movie-details.html':
			displayMovieDetails();
			break;
		case 'tv-details.html':
			displayTvDetails();
			break;
		case 'search.html':
			console.log('Search');
			break;
	}
	highlightActiveLink();
}

init();
