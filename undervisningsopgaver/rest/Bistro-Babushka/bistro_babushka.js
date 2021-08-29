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

const liste = document.querySelector("#liste");
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
