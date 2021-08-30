/** @format */

const db = "https://babushka-dd8a.restdb.io/rest/menu";
const APIKey = "600ec2fb1346a1524ff12de4";
const images = "./medium/";

let settings = {
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
let selectOpt = "alfabetisk";

const liste = document.querySelector("#liste");
const sortSelect = document.querySelector("#sort");
let skeleton = document.querySelector(".skeleton-ret");
for (i = 0; i < 10; i++) {
	liste.append(skeleton.cloneNode(true));
}

window.addEventListener("DOMContentLoaded", start);

function start() {
	loadJSON();
	// Knapper
	btns.forEach((btn) => {
		btn.addEventListener("click", filtrerRetter);
	});
	sortSelect.addEventListener("change", sorter);
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

function sorter() {
	if (sortSelect.value == "alfabetisk") {
		retter.sort((a, b) => (a.navn > b.navn ? 1 : -1));
		vis(retter);
	} else {
		retter.sort((a, b) => (a.pris > b.pris ? 1 : -1));
		vis(retter);
	}
}

// Rest API Call
async function loadJSON() {
	const JSONData = await fetch(db, settings);

	retter = await JSONData.json();
	console.log(retter[0].navn);

	// Sortering - a og b repræsenterer objecterne.
	retter.sort((a, b) => (a.navn > b.navn ? 1 : -1));
	vis(retter);
}

function vis(json) {
	const retterTemplate = document.querySelector("template");
	const container = document.querySelector("#liste");
	// Skeleton
	const skeletonGrid = document.querySelector(".grid");
	skeletonGrid.textContent = "";
	let count = 0;
	container.textContent = "";
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
			klon.querySelector(".pris-tag").textContent = `${el.pris} kr.`;
			klon
				.querySelector(".ret")
				.addEventListener("click", () => visDetaljer(el));

			container.appendChild(klon);
		}
	});
}

function visDetaljer(hvem) {
	location.href = `detail-view.html?id=${hvem._id}`;
}
