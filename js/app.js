import { state } from "./state.js";
import { readInputs, setupEvents, setActiveToggle } from "./ui.js";
import { generateSteps } from "./calculator.js";
import { render } from "./renderer.js";
import { exportPDF } from "./pdf.js";
import { initPrintLog } from "./printLog.js";



import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged
} from "[gstatic.com](https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js)";

const auth = window.auth;                    // the one set in index.html
const provider = new GoogleAuthProvider();   // Google provider

const loginBtn  = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo  = document.getElementById("userInfo");

// --- Click handlers ---
loginBtn.addEventListener("click", () => signInWithPopup(auth, provider));
logoutBtn.addEventListener("click", () => signOut(auth));

// --- Monitor auth state ---
onAuthStateChanged(auth, user => {
	if (user) {
		// signed in
		loginBtn.style.display  = "none";
		logoutBtn.style.display = "inline-block";
		userInfo.textContent    = `Signed in as ${user.displayName || user.email}`;
	} else {
		// signed out
		loginBtn.style.display  = "inline-block";
		logoutBtn.style.display = "none";
		userInfo.textContent    = "";
	}
});


let viewMode = "table";

function update() {
	readInputs();
	state.settings.viewMode = viewMode;
	state.results = generateSteps(state.settings);
	render(state.results, state.settings);
}

window.onload = () => {
	setupEvents(update);
	update();
	initPrintLog();

	// --- Toggle buttons ---
	document.getElementById("cardBtn").addEventListener("click", () => {
		viewMode = "cards";
		setActiveToggle("cardBtn");
		update();
	});

	document.getElementById("tableBtn").addEventListener("click", () => {
		viewMode = "table";
		setActiveToggle("tableBtn");
		update();
	});

	// --- Export ---
	document.getElementById("exportBtn").addEventListener("click", exportPDF);


	// --- View toggling ---
	const calcView = document.getElementById("calcView");
	const logView  = document.getElementById("logView");

	const showCalcBtn = document.getElementById("showCalcBtn");
	const showLogBtn  = document.getElementById("showLogBtn");

	function showView(view) {
		// Show or hide the sections
		calcView.style.display = view === "calc" ? "block" : "none";
		logView.style.display  = view === "log"  ? "block" : "none";

		// Update button highlighting
		showCalcBtn.classList.toggle("active", view === "calc");
		showLogBtn.classList.toggle("active",  view === "log");
	}

	// Hook up the buttons
	showCalcBtn.addEventListener("click", () => showView("calc"));
	showLogBtn.addEventListener("click",  () => showView("log"));

	// Default to calculator view on page load
	showView("calc");

};