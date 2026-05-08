import { state } from "./state.js";

/* export function exportPDF() {
	const { settings, results } = state;

	const win = window.open("", "", "width=800,height=600");

	let html = `
		<html><head>
		<style>
			body { font-family: Arial; padding:20px; }
			.card { border:1px solid #000; margin:10px 0; padding:10px; }
		</style>
		</head><body>

		<h2>Exposure Sheet</h2>

		<div>
			Base: ${settings.baseTime}s<br>
			Increment: ${settings.increment}<br>
			Steps: ${settings.steps}
		</div>
	`;

	results.forEach(d => {
		html += `
			<div class="card">
				Step ${d.step} — ${d.time.toFixed(1)}s
			</div>`;
	});

	html += `<script>window.onload=()=>window.print()</script></body></html>`;

	win.document.write(html);
	win.document.close();
} */

export function exportPDF() {

	const { settings, results } = state;

	const win = window.open("", "", "width=800,height=600");


 	const mode = viewMode;

	// prime the UI values to display in the export
	const baseTime = document.getElementById("baseTime").value;
	const increment = document.getElementById("increment").value;
	const steps = document.getElementById("steps").value;

	
	let html = `
	<html>
	<head>
		<title>F-Stop Increments Export</title>
		<style>
			body { font-family: Arial; padding: 20px; }
			.card { border: 1px solid #000; padding: 10px; margin: 10px 0; }
			table { width: 100%; border-collapse: collapse; }
			td, th { border: 1px solid #000; padding: 8px; }
		</style>
	</head>

	<body>
	<h2>F-Stop Test Strip Sheet</h2>

	<div class="settings">
		<b>Settings</b><br>
		Base Time: ${baseTime}s<br>
		F-Stop Increment: ${increment}<br>
	</div>
	`;

	if (mode === "cards") {
		lastData.forEach(d => {
			html += `
			<div class="card">
			Step ${d.stepCount}<br>
			Exposure: ${d.time.toFixed(1)}s<br>
			Strip Add: +${d.stripIncrement.toFixed(1)}s<br>
			Range: ${d.stripStart.toFixed(1)} → ${d.stripEnd.toFixed(1)}s
			</div>`;
		});
	} else {
		html += `<table>
		<tr><th>Step</th><th>Strip Add</th><th>Exposure</th></tr>`;

		lastData.forEach(d => {
			html += `<tr>
			<td>${d.stepCount}</td>
			<td>+${d.stripIncrement.toFixed(1)}</td>
			<td>${d.time.toFixed(1)}</td>
			</tr>`;
	});

	html += `</table>`;
	}

	html += `
	<script>
		window.onload = () => window.print();
	<\/script>
	</body></html>`;

	win.document.write(html);
	win.document.close();

}	// END exportPDF()