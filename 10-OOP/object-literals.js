const rect = {
	name: 'Rect 1',
	width: 10,
	height: 5,
	area() {
		return this.width * this.height;
	},
};

// console.log(rect.area());

// Constructor function
function Rectangle(name, width, height) {
	this.name = name;
	this.width = width;
	this.height = height;
}

Rectangle.prototype.area = function () {
	return this.width * this.height;
};

Rectangle.prototype.perimeter = function () {
	return this.width + this.height;
};

Rectangle.prototype.isSquare = function () {
	return this.width === this.height;
};

const r = new Rectangle('Rect 1', 10, 10);

console.log(r);

const rectPrototypes = {
	area() {
		return this.width * this.height;
	},
	perimeter() {
		return this.width + this.height;
	},
	isSquare() {
		return this.width === this.height;
	},
};

function createRectangle(height, width) {
	return Object.create(rectPrototypes, {
		height: {
			value: height,
		},
		width: {
			value: width,
		},
	});
}

const myRect = createRectangle(10, 20);
console.log(myRect);

function Shape(name) {
	this.name = name;
}

Shape.prototype.logName = function () {
	console.log(`Shape name: ${this.name}`);
};

function Rect(name, height, width) {
	Shape.call(this, name);
	this.height = height;
	this.width = width;
}

Rect.prototype = Object.create(Shape.prototype);

function Circle(name, radius) {
	Shape.call(this, name);
	this.radius = radius;
}

const smallRect = new Rect('Small', 5, 2);
const circle = new Circle('Circle', 10);
console.log(smallRect);

// console.log(r.constructor);

// const strLit = 'Hello';
// const strObj = new String('Hello');

// console.log(strLit, typeof strLit);
// console.log(strObj, typeof strObj);
