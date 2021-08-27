/** @format */

const db = "https://babushka-dd8a.restdb.io/rest/menu";
const APIKey = "600ec2fb1346a1524ff12de4";
const images = "./medium/";

var settings = {
	async: true,
	crossDomain: true,
	url: db,
	method: "GET",
	headers: {
		"content-type": "application/json",
		"x-apikey": APIKey,
		"cache-control": "no-cache",
	},
};

// DOM Elementer
const btns = document.querySelectorAll("button");

//Globale Variabler
let retter;
let filter = "alle";

window.addEventListener("DOMContentLoaded", start);

function start() {
	loadJSON();
	// Knapper
	btns.forEach((btn) => {
		btn.addEventListener(
			"click",
			filtrerRetter
			// (e) => {
			// 	btns.forEach((activeState) => {
			// 		activeState.classList.remove("active");
			// 	});
			// 	let clicked = e.target;
			// 	clicked.classList.add("active");
			// 	filter = clicked.textContent.toLowerCase();
			// 	filtrerRetter();
			// 	console.log(btn.dataset);
			// });
		);
	});
}

// Filtrering
function filtrerRetter() {
	filter = this.dataset.retter;
	document.querySelector(".active").classList.remove("active");
	this.classList.add("active");

	let firstLetter = filter.charAt(0).toUpperCase() + filter.slice(1);

	document.querySelector("h2").textContent = firstLetter;

	vis(retter);
}

// Rest API Call
async function loadJSON() {
	const JSONData = await fetch(db, settings);
	retter = await JSONData.json();
	vis(retter);
}

function vis(json) {
	const retterTemplate = document.querySelector("template");
	const container = document.querySelector("#liste");
	let count = 0;
	container.textContent = "";
	console.log(json);
	json.forEach((el) => {
		count++;

		if (filter == el.kategori || filter == "alle") {
			let klon = retterTemplate.cloneNode(true).content;
			klon.querySelector(".name").textContent = el.navn;
			klon.querySelector(".kort").textContent = el.kortbeskrivelse;
			klon.querySelector("img").src = `${images}${el.billednavn}-md.jpg`;
			klon.querySelector(
				".country"
			).textContent = `Land: ${el.oprindelsesregion}`;
			// klon.querySelector(".createdAt").textContent = `Created: ${truncateString(
			// 	el.createdAt,
			// 	10
			// )}`;

			//Appender alle elementerne
			container.appendChild(klon);
		}
	});
}

// function truncateString(string, limit) {
// 	if (string.length > limit) {
// 		return string.substring(0, limit);
// 	} else {
// 		return string;
// 	}
// }
