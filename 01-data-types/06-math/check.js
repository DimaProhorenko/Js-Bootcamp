const x = parseInt(Math.random() * 100 + 1);
const y = parseInt(Math.random() * 50 + 1);

const sum = `${x} + ${y} = ${x + y}`;
const sub = `${x} - ${y} = ${x - y}`;
const product = `${x} * ${y} = ${x * y}`;
const div = `${x} / ${y} = ${(x / y).toFixed(2)}`;
const mod = `${x} % ${y} = ${x % y}`;

console.log(sum);
console.log(sub);
console.log(product);
console.log(div);
console.log(mod);
console.log(sum);
