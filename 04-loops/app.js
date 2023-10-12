//  For loops
const items = ['book', 'table', 'pen', 'notebook', 'laptop'];

// for (let i = 0; i < items.length; i++) {
// 	console.log(items[i]);
// }

// for (const item of items) {
// 	console.log(item);
// }

const colorObj = {
	color1: 'red',
	color2: 'blue',
	color3: 'orange',
	color4: 'green',
};

// for (const key in colorObj) {
// 	console.log(key, colorObj[key]);
// }

// Array.forEach
const socials = ['LinkedIn', 'Twitter', 'Facebook', 'Instagram'];

// console.log(socials, socials.__proto__);

// socials.forEach((el, index) => {
// 	console.log(`${index} - ${el}`);
// });

// Array.filter
const nums = [1, 2, 3, 4, 5, 6, 7, 8];

// const biggerThan4 = nums.filter((n) => n > 4);
// console.log(biggerThan4);

// Array.reduce
const shoppingCart = [
	{
		item: 'Brush',
		price: 1,
	},
	{
		item: 'Chips',
		price: 3,
	},
	{
		item: 'Soda',
		price: 7.99,
	},
];

const total = shoppingCart.reduce(
	(accumulator, prevItem) => accumulator + prevItem.price,
	0
);
console.log(total);
