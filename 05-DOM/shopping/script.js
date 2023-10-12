let output;

// // Deprecated
// output = document.all;

// output = document.head;
// output = document.body.children;

// output = document.domain;
// output = document.URL;
// output = document.characterSet;

// output = document.forms[0].id;

// const forms = Array.from(document.forms);
// forms.forEach((form) => console.log(form));

// output = document.getElementById('app-title');
// document.getElementById('app-title').title = 'Your shopping list';
// document.getElementById('app-title').setAttribute('class', 'title');

// const title = document.getElementById('app-title');
// title.textContent = "That's weird!";
// title.innerHTML = "<strong>That's weird!";

// title.style.color = 'red';
// title.style.backgroundColor = 'black';
// title.style.padding = '.5rem .75rem';
// title.style.borderRadius = '20px';

// document.querySelector();
const title = document.querySelector('h1');
output = title;
output = document.querySelector('#app-title');
output = document.querySelector('input[type="text"]');

document.querySelector('li:nth-child(2)').style.color = 'orange';

console.log(output);
