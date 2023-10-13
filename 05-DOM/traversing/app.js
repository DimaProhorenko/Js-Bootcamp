let output;

// Get child elements
const parent = document.querySelector('.parent');
parent.firstElementChild.textContent = 'First';
parent.lastElementChild.textContent = 'Last';
output = Array.from(parent.children);

const child = document.querySelector('.child');
output = child.parentElement;
child.parentElement.style.border = '1px solid red';
child.parentElement.style.padding = '10px';

const secondItem = document.querySelector('.child:nth-child(2)');
output = secondItem.nextElementSibling;

// Create and Insert elements
const div = document.createElement('div');
div.className = 'my-element';
div.id = 'created-div';
div.setAttribute('title', 'my-div');

// div.innerText = 'Hello world';

const text = document.createTextNode('Hello world');
div.appendChild(text);

document.body.appendChild(div);

output = div;

// Insert elements
const insertElement = (el) => {
	const parent = document.querySelector('.parent');
	parent.insertAdjacentElement('afterend', el);
};

const createLink = (classes, href, text) => {
	const link = document.createElement('a');
	const textNode = document.createTextNode(text);
	link.appendChild(textNode);
	link.setAttribute('href', href);
	link.className = classes;
	link.style.color = 'red';
	return link;
};

const insertBeforeTest = () => {
	const parent = document.querySelector('.parent');
	const h2 = document.createElement('h2');
	h2.textContent = 'insertBefore';
	const third = parent.querySelector('.child:nth-child(3)');
	parent.insertBefore(h2, third);
};

const link = createLink('link', '#', 'Works');

// insertElement(link);
// insertBeforeTest();

const insertAfter = (elementToInsert, insertAfterElement) => {
	insertAfterElement.insertAdjacentElement('afterend', elementToInsert);
};

// insertAfter(link, document.querySelector('.parent'));

const replace = () => {
	const first = document.querySelector('.parent .child');
	const p = document.createElement('p');
	p.textContent = 'Replaced First';
	first.replaceWith(p);
};

replace();

console.log(output);
