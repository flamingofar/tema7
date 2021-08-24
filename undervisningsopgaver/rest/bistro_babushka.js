/** @format */

const db = "https://babushka-dd8a.restdb.io/rest/menu";
const APIKey = "600ec2fb1346a1524ff12de4";
const images = "images.json";

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

async function fetchDBData() {
	const res = await fetch(db, settings);
	const json = await res.json();
	vis(json);
}

function vis(json) {
	const retterTemplate = document.querySelector("template");
	const container = document.querySelector("#liste");
	let count = 0;

	json.forEach((el) => {
		count++;
		let klon = retterTemplate.cloneNode(true).content;
		klon.querySelector(".name").textContent = el.navn;
		klon.querySelector(".kort").textContent = el.kortbeskrivelse;
		klon.querySelector("img").src = `faces/img${count}.jpg`;
		klon.querySelector(
			".country"
		).textContent = `Land: ${el.oprindelsesregion}`;
		// klon.querySelector(".year").textContent = `Årgang: ${el.year}`;
		// klon.querySelector(".createdAt").textContent = `Created: ${truncateString(
		// 	el.createdAt,
		// 	10
		// )}`;

		//Appender alle elementerne
		container.appendChild(klon);
	});

	console.log(json);
}

function truncateString(string, limit) {
	if (string.length > limit) {
		return string.substring(0, limit);
	} else {
		return string;
	}
}

fetchDBData();
