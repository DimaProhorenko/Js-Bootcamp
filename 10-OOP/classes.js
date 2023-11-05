class Shape {
	constructor(name) {
		this.name = name;
	}

	logName() {
		console.log(`Shape name: ${this.name}`);
	}
}

class Rectangle extends Shape {
	constructor(name, width, height) {
		super(name);
		this.width = width;
		this.height = height;
	}

	area() {
		return this.width * this.height;
	}

	perimeter() {
		return 2 * (this.width + this.height);
	}

	isSquare() {
		return this.width === this.height;
	}

	logArea() {
		return `Rectangle Area: ${this.area()}`;
	}
}

class Circle extends Shape {
	constructor(name, radius) {
		super(name);
		this.radius = radius;
	}
}

const r1 = new Rectangle('R1', 2, 2);
const c1 = new Circle('C1', 5);

// console.log(r1);
console.log(c1);
r1.logName();
