import { state } from "./state.js";

export function readInputs() {
	state.settings.baseTime = Math.round(parseFloat(document.getElementById("baseTime").value));
	state.settings.increment = parseFloat(document.getElementById("increment").value);
	state.settings.steps = parseInt(document.getElementById("steps").value);
	// state.settings.viewMode = document.getElementById("viewMode").value;
}

export function setupEvents(onChange) {
	// ["baseTime","increment","steps","viewMode"].forEach(id => {
	["baseTime","increment","steps"].forEach(id => {
		const el = document.getElementById(id);
		el.addEventListener("input", onChange);
		el.addEventListener("change", onChange);
	});
}

export function setActiveToggle(activeId) {
 	document.querySelectorAll(".toggle button").forEach(btn =>
		btn.classList.remove("active")
	);
	document.getElementById(activeId).classList.add("active");
}