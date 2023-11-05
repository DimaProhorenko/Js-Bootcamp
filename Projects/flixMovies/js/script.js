const router = {
	fullPath: window.location.pathname.split('/'),
	getCurrentPage: function () {
		return this.fullPath[this.fullPath.length - 1];
	},
	search: {
		query: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
};

const nextSearchPageHandler = () => {
	router.search.page++;
	displaySearchResults();
	updatePagination();
};

const createItemFromMovie = (movie) => {
	return {
		title: movie.title,
		release_date: movie.release_date,
		poster_path: movie.poster_path,
		id: movie.id,
		rating: movie.vote_average,
	};
};

const createItemFromShow = (show) => {
	return {
		title: show.name,
		release_date: show.first_air_date,
		poster_path: show.poster_path,
		id: show.id,
		rating: show.vote_average,
	};
};

const highlightActiveLink = () => {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === './' + router.getCurrentPage()) {
			link.classList.add('text-primary');
		}
	});
};

const createPagination = () => {
	const pagination = document.createElement('div');
	pagination.id = 'pagination';
	pagination.className = 'pagination';

	const prevBtn = document.createElement('button');
	prevBtn.className = 'btn btn-primary';
	prevBtn.id = 'prev';
	prevBtn.textContent = 'Prev';
	prevBtn.style.marginInlineEnd = '.5rem';
	prevBtn.disabled = router.search.page === 1;

	const nextBtn = document.createElement('button');
	nextBtn.className = 'btn btn-primary';
	nextBtn.id = 'next';
	nextBtn.textContent = 'Next';
	nextBtn.disabled = router.search.page === router.search.totalPages;
	nextBtn.addEventListener('click', nextSearchPageHandler);

	const pageCounter = document.createElement('div');
	pageCounter.className = 'page-counter';
	pageCounter.appendChild(document.createTextNode('Page '));

	const currentPage = document.createElement('span');
	currentPage.textContent = router.search.page;
	currentPage.id = 'current-page';

	const totalPages = document.createElement('span');
	totalPages.textContent = router.search.totalPages;
	totalPages.id = 'total-pages';

	pageCounter.appendChild(currentPage);
	pageCounter.appendChild(document.createTextNode(' of '));
	pageCounter.appendChild(totalPages);

	pagination.appendChild(prevBtn);
	pagination.appendChild(nextBtn);
	pagination.appendChild(pageCounter);

	return pagination;
};

const updatePagination = () => {
	const prevBtn = document.querySelector('#prev');
	const nextBtn = document.querySelector('#next');
	const currentPage = document.querySelector('#current-page');
	const totalPages = document.querySelector('#total-pages');

	prevBtn.disabled = router.search.page === 1;
	nextBtn.disabled = router.search.page === router.search.totalPages;
	// currentPage = document
};

const showSpinner = () => {
	const spinner = document.querySelector('.spinner');
	spinner.style.display = 'block';
};

const hideSpinner = () => {
	const spinner = document.querySelector('.spinner');
	spinner.style.display = 'none';
};

const showAlert = (msg, classNames) => {
	const alert = document.createElement('div');
	alert.classList.add('alert', classNames);
	alert.appendChild(document.createTextNode(msg));
	document.querySelector('#alert').appendChild(alert);

	setTimeout(() => {
		document.querySelector('#alert').removeChild(alert);
	}, 2000);
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

// Now playing slider
const displaySlider = async () => {
	const { results } = await fetchAPIData('movie/now_playing');
	const slider = document.querySelector('#main-slider');
	results.forEach((movie) => {
		slider.appendChild(createSlide(createItemFromMovie(movie)));
	});
};

const createSlide = (item) => {
	const slide = document.createElement('div');
	slide.className = 'swiper-slide';

	const link = document.createElement('a');
	link.setAttribute('href', `./movie-details.html?id=${item.id}`);

	const poster = document.createElement('img');
	setImageSrc(poster, item.poster_path);
	poster.setAttribute('alt', item.title);

	const rating = document.createElement('h4');
	rating.className = 'swiper-rating';

	const ratingStar = document.createElement('i');
	ratingStar.className = 'fas fa-star text-secondary';

	const span = document.createElement('span');
	span.textContent = `${Math.floor(item.rating)}/10`;

	rating.appendChild(ratingStar);
	rating.appendChild(span);

	link.appendChild(poster);

	slide.appendChild(link);
	slide.appendChild(rating);

	return slide;
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

const search = async () => {
	const searchParams = new URLSearchParams(window.location.search);
	router.search.type = searchParams.get('type');
	router.search.query = searchParams.get('search-term');

	if (router.search.query !== '' && router.search.query !== null) {
		displaySearchResults();
		const pagination = createPagination();
		document
			.querySelector('#search-results-wrapper')
			.appendChild(pagination);
	} else {
		showAlert('Please enter a search query', 'alert-error');
	}
};

const displaySearchResults = async () => {
	const {
		results,
		page,
		total_pages,
		total_results: totalResults,
	} = await searchMovieShow(router.search.type, router.search.query);

	router.search.totalResults = totalResults;
	router.search.page = page;
	router.search.totalPages = total_pages;

	document.querySelector('#search-results-heading').textContent = `${
		page * 20
	} of ${router.search.totalResults} Results for ${router.search.query}`;

	const resultsEl = document.querySelector('#search-results');
	results.forEach((item) => {
		const itemObj =
			router.search.type === 'movie'
				? createItemFromMovie(item)
				: createItemFromShow(item);
		const itemCard = createMovieCard(itemObj, 'tv');
		resultsEl.appendChild(itemCard);
	});
};

const getMovieGenre = async (movieGenres) => {
	const { genres } = await fetchMovieGenres();
	return genres.filter((genre) => {
		return movieGenres.includes(genre.id);
	});
};

const fetchProductionCompany = async (id) => {
	const result = await fetchAPIData(`company/${id}/images`);
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
	showSpinner();

	const repsonse = await fetch(url);
	const data = await repsonse.json();
	hideSpinner();
	return data;
};

const searchMovieShow = async (type = 'movie', query) => {
	const API_KEY = 'a2cb3b0b44c96a3a6377f4075e0d9718';
	const API_URL = 'https://api.themoviedb.org/3/';
	showSpinner();
	let url = `${API_URL}/search/${router.search.type}?api_key=${API_KEY}&language=en-US&query=${router.search.query}`;
	const response = fetch(url);
	hideSpinner();
	return (await response).json();
};

const initSwiper = () => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			400: {
				slidesPerView: 2,
			},
			670: {
				slidesPerView: 3,
			},
			980: {
				slidesPerView: 4,
			},
		},
	});
	displaySlider();
};

// Init App
function init() {
	switch (router.getCurrentPage()) {
		case '/':
			initSwiper();
			displayPopularMovies();
			break;
		case 'index.html':
			initSwiper();
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
			search();
			break;
	}
	highlightActiveLink();
}

init();
