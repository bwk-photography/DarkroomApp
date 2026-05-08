import { state } from "./state.js";
import { readInputs, setupEvents } from "./ui.js";
import { generateSteps } from "./calculator.js";
import { render } from "./renderer.js";
import { exportPDF } from "./pdf.js";

// let viewMode="Table";

function update() {
	readInputs();
	state.results = generateSteps(state.settings);
	console.log("app.update, after generateSteps, viewMode",viewMode);

	render(state.results, state.settings);

	console.log("app.update, END, viewMode",viewMode);
}


console.log("onload - BEFORE");


window.onload = () => {
	console.log("app.onload - BEG, viewMode",viewMode);
	setupEvents(update);
	update();

	document.getElementById("cardBtn").addEventListener("click", generateSteps);
	document.getElementById("tableBtn").addEventListener("click", generateSteps);
	document.getElementById("exportBtn").addEventListener("click", exportPDF);
	console.log("app.onload - END, viewMode",viewMode);
};