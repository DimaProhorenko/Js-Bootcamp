const fetchUser = () => {
	fetch('https://randomuser.me/api/')
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return null;
		})
		.then((data) => {
			const user = data.results[0];
			displayUser(user);
		});
};

const displayUser = (user) => {
	updateUserImg(user.picture.large);
	updateName(user);
	updateEmail(user.email);
	updatePhone(user.phone);
	updateLocation(user.location);
	updateAge(user.dob.age);
};

const updateUserImg = (path) => {
	userImg.setAttribute('src', path);
};

const updateName = (user) => {
	userName.textContent = `${user.name.first} ${user.name.last}`;
};

const updateEmail = (email) => {
	emailSpan.textContent = email;
};

const updatePhone = (phone) => {
	phoneSpan.textContent = phone;
};

const updateLocation = (loc) => {
	locSpan.textContent = `${loc.country} - ${loc.city}`;
};

const updateAge = (age) => (ageSpan.textContent = age);

const generateUserHandler = () => {
	fetchUser();
};

const generateBtn = document.getElementById('generate-user');
const userImg = document.querySelector('.card__img img');
const userName = document.getElementById('name-span');
const emailSpan = document.getElementById('email-span');
const phoneSpan = document.getElementById('phone-span');
const locSpan = document.getElementById('location-span');
const ageSpan = document.getElementById('age-span');

generateBtn.addEventListener('click', generateUserHandler);
window.addEventListener('DOMContentLoaded', generateUserHandler);
