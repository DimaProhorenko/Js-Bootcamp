// const clearBtn = document.getElementById('clear-btn');

// // Not recommended
// // clearBtn.onclick = function () {
// // 	alert('Cleared');
// // };

// const onClear = () => {
// 	alert('Cleared');
// };

// clearBtn.addEventListener('click', onClear);

// // setTimeout(() => {
// // 	clearBtn.removeEventListener('click', onClear);
// // 	console.log('removed');
// // }, 5000);

// // setTimeout(() => clearBtn.click(), 5000);

const clearBtn = document.getElementById('clear');

const clearHandler = () => {
	const ul = document.querySelector('.items');
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
};

clearBtn.addEventListener('click', clearHandler);
