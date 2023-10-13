const title = document.querySelector('#main-title');

// Event Handlers

const clickHandler = () => console.log('Clicked Title');

const doubleClickHandler = () => {
	document.body.style.backgroundColor = 'purple';
	document.body.style.color = 'white';
};

const rightClickHandler = (e) => e.preventDefault();

// Event Listeners
title.addEventListener('click', clickHandler);
title.addEventListener('dblclick', doubleClickHandler);
title.addEventListener('contextmenu', rightClickHandler);
