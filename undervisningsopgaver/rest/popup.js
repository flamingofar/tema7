/** @format */

const header = document.querySelector("header h1");
const medieurl = "./faces/faces/";
const myHeaders = {
	"x-apikey": "600fe9211346a1524ff12e31",
};
document.addEventListener("DOMContentLoaded", start);

const h1 = document.querySelector("h1");
const btns = document.querySelectorAll("button");
const btn1 = document.querySelector(".check_1");
const btn2 = document.querySelector(".check_2");
const btn3 = document.querySelector(".check_3");

const popUp = document.querySelector("#popup");

const checkBox = document.querySelectorAll('input[type="checkbox"]');

btns.forEach((btn) => {
	btn.addEventListener("click", filtrerPersoner);
});

let personer;
let count = 0;

let troende = true;
let ikkeTroende = false;
let tvivler = false;

let troendeFilter;
let ikkeTroendeFilter;
let tvivlerFilter;

btn1.checked = troende;
btn2.checked = ikkeTroende;
btn3.checked = tvivler;

// første funktion der kaldes efter DOM er loaded
function start() {
	loadJSON();
}

async function loadJSON() {
	const JSONData = await fetch(
		"https://persongalleri-5d3e.restdb.io/rest/persongalleri",
		{
			headers: myHeaders,
		}
	);
	personer = await JSONData.json();
	visPersoner();
}

//funktion der viser personer i liste view
function visPersoner() {
	checkBox.forEach((el) => {
		el.addEventListener("click", checkBoxHandler);
	});
	const dest = document.querySelector("#liste"); // container til articles med en person
	const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)

	dest.textContent = "";

	troende = btn1.checked;
	ikkeTroende = btn2.checked;
	tvivler = btn3.checked;

	personer.forEach((person) => {
		count++;
		troendeFilter = person.troende;
		ikkeTroendeFilter = person.troende;
		tvivlerFilter = person.troende;
		// loop igennem json

		if (
			(troende == true && troendeFilter == "ja") ||
			(ikkeTroende == true && ikkeTroendeFilter == "nej") ||
			(tvivler == true && tvivlerFilter == "tvivler")
		) {
			const klon = skabelon.cloneNode(true);
			klon.querySelector(".navn").textContent =
				person.fornavn + " " + person.efternavn;
			klon.querySelector(".profil-billede").src = medieurl + person.billede;
			klon
				.querySelector("article")
				.addEventListener("click", () => popUpWindow(person));
			dest.appendChild(klon);
		}
	});
	count = 0;
}

function checkBoxHandler() {
	this.checked ? (this.checked = true) : (this.checked = false);
	visPersoner();
}

function popUpWindow(person) {
	popUp.style.display = "block";
	popUp.querySelector("img").src = "faces/faces/" + person.billede;
	popUp.querySelector(
		"h2"
	).textContent = `${person.fornavn} ${person.efternavn}`;
	popUp.querySelector(".titel").textContent = person.titel;
	popUp.querySelector(".email").textContent = person.email;
	popUp.querySelector(".fdag").textContent = person.fødselsdag;
	popUp.querySelector(".hobby").textContent = person.hobby;
	popUp.querySelector(".tro").textContent = person.troende;
	popUp.querySelector(".luk").addEventListener("click", (e) => {
		popUp.style.display = "none";
	});
	popUp.addEventListener("click", (e) => {
		console.log(e);
		if (e.explicitOriginalTarget.id == "popup") {
			popUp.style.display = "none";
		}
	});
}
