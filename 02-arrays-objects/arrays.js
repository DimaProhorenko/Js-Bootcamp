// let x;

// const nums = [1, 2, 4, 6, 9];

// const fruits = new Array('apple', 'orange', 'grape');

// x = nums[0];

// x = nums.length;

// fruits[2] = 'lemon';

// x = fruits;

// console.log(x);

// Array methods

// const nums = [34, 1, 66, 23, 15];

// nums.push(100);
// nums.pop();
// nums.unshift(100);
// nums.shift();
// nums.reverse();

// let x;

// x = nums.indexOf(0);

// x = nums.includes(0);

// x = nums.slice(1, 3);

// console.log(x);

// Array nesting

let x;
const fruits = ['apple', 'pear', 'orange'];
const berries = ['strawberry', 'blueberry', 'raspberry'];

// fruits.push(berries);

// x = fruits;

// x = fruits[3][1];

// x = fruits.concat(berries);
// // x = fruits;

// // Spread operator

// x = [...fruits, ...berries];

// // Static methods
// x = Array.isArray(fruits);

// x = Array.from('12345');

// const a = 1;
// const b = 2;
// const c = 3;

// x = Array.of(a, b, c);

// console.log(x);

const a = [1, 2, 3, 4, 5];
const b = [5, 6, 7];

const c = [...a, ...b];
const index = c.indexOf(5);
c.splice(index, 1);

console.log(c);
