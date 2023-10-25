const title = document.querySelector('#main-title');

title.addEventListener('click', function (e) {
	console.log(e.target);
	console.log(e.type);
	console.log(e.timeStamp);
	console.log(e.cli   );
});
